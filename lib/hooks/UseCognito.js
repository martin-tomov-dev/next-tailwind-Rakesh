import CognitoClient, { getCognitoInstance } from "../cognito/CognitoClient";
import { useEffect, useState } from "react";

/**
 *
 * @returns { { cognitoClient: CognitoClient } }
 */
export default function useCognito() {
  const [client, setClient] = useState(null);

  //uncertain if we need error handling here. possibly not?
  useEffect(() => {
    let mounted = true;

    const fetchAndCreateClient = async () => {
      const instance = await getCognitoInstance();

      if (mounted) {
        setClient(instance);
      }
    };

    fetchAndCreateClient();

    return () => (mounted = false);
  }, [setClient]);

  return {
    cognitoClient: client,
    loading: !client,
  };
}
