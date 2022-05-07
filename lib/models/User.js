import { CognitoUserSession } from "amazon-cognito-identity-js";

/**
 * @class User
 *
 * @property {CognitoUserSession} session
 * @property {String} jwt
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 */
export default class User {
  /**
   *
   * @param {CognitoUserSession} session
   */
  constructor(session) {
    const { jwt, payload } = session.idToken;

    this.session = session;

    this.jwt = jwt;

    this.firstName = payload.name;
    this.lastName = payload.family_name;
    this.email = payload.email;
  }
}
