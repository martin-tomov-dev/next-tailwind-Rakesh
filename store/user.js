import { atom } from "jotai";
import { getCognitoInstance } from "../lib/cognito/CognitoClient";
import User from "../lib/models/User";

const userSessionResult = atom({ loading: true, user: null, error: null });
export const userSessionAtom = atom(
  (get) => get(userSessionResult),
  (_get, set, url) => {
    const fetchData = async () => {
      try {
        const cognitoClient = await getCognitoInstance();

        const session = await cognitoClient.getUserSession();

        if (session && session.isValid()) {
          set(userSessionResult, { loading: false, user: new User(session) });
        } else {
          set(userSessionResult, { loading: false, user: null });
        }
      } catch (e) {
        set(userSessionResult, { loading: false, error: e, user: null });
      }
    };

    fetchData();
  }
);

userSessionAtom.onMount = (runFetch) => {
  runFetch();
};
