import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useCognito from "../lib/hooks/UseCognito";

export default function Logout() {
  const { cognitoClient } = useCognito();
  const { cache } = useSWRConfig();

  useEffect(() => {
    const logout = async () => {
      await cognitoClient.logout();

      //we're gonna pull two tricks out... we will manually dump the useswr cache
      //and then on top of that, we'll change window.location instead of pusing a new route.
      //this will FORCE a refresh, which is more in-line w/ what we want.... we'll end up
      //dumping any transcient caches
      cache.clear();
      window.location = "/";
    };

    if (cognitoClient) {
      logout();
    }
  }, [cognitoClient]);

  return <></>;
}
