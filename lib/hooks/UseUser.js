import { useRouter } from "next/router";
import User from "../models/User";
import { useAtom } from "jotai";
import { userSessionAtom } from "../../store/user";

/**
 *
 * @returns { { user: User } }
 */
export default function useUser(redirectTo = "/") {
  const [{ user, loading, error }] = useAtom(userSessionAtom);
  const { push } = useRouter();
  if (error && redirectTo) {
    //we can also try to stash something in local storage about where they tried to go?
    //then, somewhere in _app (or the most basic entry point we can think of) we send them
    //there if it is set, and unset it....
    push(redirectTo);
  }

  return { user, loading };
}
