import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUserSession,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import axios from "axios";

const makeCognitoClient = async () => {
  const response = await axios.get("/api/auth/userpool");

  return new CognitoClient(response.data);
};

let cognitoPromise = null;

/**
 *
 * @returns {Promise<CognitoClient>}
 */
export const getCognitoInstance = () => {
  cognitoPromise = cognitoPromise || makeCognitoClient();
  return cognitoPromise;
};

/**
 * this class will handle all auth related concerns.
 *
 * largely adapted from docs for cognito/amplify (as of 5.2.8)
 *
 * This is exported solely to provide type annotations.
 * In order to grab a proper instance of this class, import { getCognitoInstance }
 *
 * https://www.npmjs.com/package/amazon-cognito-identity-js
 */
export default class CognitoClient {
  constructor({ userPoolId, clientId, domain }) {
    // TODO: we should probably store and retrieve this from local storage.... these values
    // are static per host except under extreme circumstances. session storage might be an option
    // but I don't recall if session storage is tab based (survives redirects) or dumps as soon
    // as the user navigates away
    this.userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId,
    });

    this.oauthDomain = domain;
    this.oauthRedirectUrl = new URL("auth_callback", window.location.origin);
  }

  goToAuthorize(provider) {
    //TODO: build url w/ new URL
    const authUrl = `${
      this.oauthDomain
    }/oauth2/authorize?identity_provider=${provider}&redirect_uri=${
      this.oauthRedirectUrl.href
    }&response_type=CODE&client_id=${this.userPool.getClientId()}&scope=email openid phone profile`;

    window.location = authUrl;
  }

  async redeemAuthCode(code) {
    //TODO: build url w/ new URL
    const tokenUrl = `${this.oauthDomain}/oauth2/token`;

    const postData = new URLSearchParams();
    postData.append("grant_type", "authorization_code");
    postData.append("code", code);
    postData.append("client_id", this.userPool.getClientId());
    postData.append("redirect_uri", this.oauthRedirectUrl.href);

    const { data: tokenData } = await axios.post(tokenUrl, postData);

    const { id_token, refresh_token, access_token } = tokenData;
    const decodeToken = (token) => {
      const encodedPayload = token.split(".")[1];
      const decodedRawPayload = window.atob(encodedPayload);
      return JSON.parse(decodedRawPayload);
    };
    //lets get the sub header...
    const decodedIdToken = decodeToken(id_token);
    const sub = decodedIdToken.sub;
    // lets experiment w/ just setting local storage up the same way that cognito does it...
    window.localStorage.setItem(
      `CognitoIdentityServiceProvider.${this.userPool.getClientId()}.LastAuthUser`,
      sub
    );
    const prefix = `CognitoIdentityServiceProvider.${this.userPool.getClientId()}.${sub}`;
    window.localStorage.setItem(`${prefix}.idToken`, id_token);
    window.localStorage.setItem(`${prefix}.accessToken`, access_token);
    window.localStorage.setItem(`${prefix}.refreshToken`, refresh_token);
  }

  /**
   * attempt to add a user to the user pool
   */
  signUp({ firstName, lastName, email, password }) {
    const attributes = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: "family_name",
        Value: lastName,
      }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        attributes,
        null,
        (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  /**
   * attempt to send email verification code
   *
   * @returns {Promise}
   */
  confirmSignUp({ email, verificationCode }) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      user.confirmRegistration(verificationCode, false, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * attempt to resend verification code to user
   * @returns {Promise}
   */
  resendConfirmation({ email }) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise((resolve, reject) => {
      user.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   *
   * @param {{ email: {String}, password: {String}}} param0
   * @returns
   */
  loginUser({ email, password }) {
    const user = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    return new Promise((resolve, reject) => {
      //TODO: there are a TON more types of callbacks here
      //not totally sure why the api is so different for this one call
      //but probably becaues of the vast range of possibilities?
      //at some point we'll need to do mfa, etc
      user.authenticateUser(authDetails, {
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  }

  #getUser() {
    const user = this.userPool.getCurrentUser();
    // return user;
    if (user) {
      return user;
    }

    //TODO: i really can't decide if this is an ok move or not
    throw "no user logged in";
  }

  /**
   *
   * @returns {Promise<CognitoUserSession>}
   */
  getUserSession() {
    const user = this.#getUser();
    if (user) {
      return new Promise((resolve, reject) => {
        user.getSession((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    return null;
  }

  /**
   *
   * @returns {Promise<CognitoUserSession>}
   */
  async refreshSession() {
    const user = this.#getUser();

    const thisSession = await this.getUserSession();

    return new Promise((resolve, reject) => {
      user.refreshSession(thisSession.getRefreshToken(), (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * @returns {Promise}
   */
  logout() {
    const user = this.#getUser();
    if (!user) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      user.signOut((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
