import { getCognitoInstance } from "../cognito/CognitoClient";

//TODO: i feel like i'm avoiding using react-y stuff like useMemo that might
//more seamlessly accomplish a few of these tasks...
export default class TokenInjectingInterceptor {
  constructor() {
    //if this promise exists, a refresh is in progress
    //and we can piggyback on that
    this.refreshPromise = null;

    //cached elements to help maintain session
    this.cognitoClient = null;
    //ensures that init is called just once
    this.inited = false;
  }

  async init() {
    if (this.inited) {
      return;
    }

    this.cognitoClient = await getCognitoInstance();

    this.inited = true;
  }

  async performRefresh() {
    //try to account for ANY race conditions
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.session = await this.cognitoClient.refreshSession();

    const token = this.session.getIdToken();
    return token.getJwtToken();
  }

  async getToken() {
    if (this.refreshPromise) {
      return await this.refreshPromise;
    }

    const session = await this.cognitoClient.getUserSession();
    const idToken = session.getIdToken();

    //my understanding is that getTime will always return in UTC
    const currentTS = parseInt(new Date().getTime() / 1000);
    //apply a 5 second buffer.... super super generous window so that
    //we don't send a request right as expiration occurs
    const tokenIsValid = idToken.payload.exp >= currentTS + 5;

    if (tokenIsValid) {
      return idToken.getJwtToken();
    }

    this.refreshPromise = this.performRefresh();
    const jwt = await this.refreshPromise;
    this.refreshPromise = null;

    return jwt;
  }

  async injectToken(config) {
    try {
      await this.init();

      const token = await this.getToken();
      config.headers["Authorization"] = `Bearer ${token}`;

      return config;
    } catch (err) {
      console.error(err);
    }
  }
}
