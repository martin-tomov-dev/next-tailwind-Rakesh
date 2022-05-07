import { useEffect } from "react";
import { useRouter } from "next/router";

import useCognito from "../lib/hooks/UseCognito";

export default function AuthCallback() {
  const { query, replace } = useRouter();
  const { cognitoClient } = useCognito();

  useEffect(() => {
    const getToken = async () => {
      try {
        await cognitoClient.redeemAuthCode(query.code);
        replace("/profile");
      } catch (e) {
        console.error(e);
      }
    };

    if (query.code) {
      getToken();
    }
  }, [query]);

  return <>Loading...</>;
}
