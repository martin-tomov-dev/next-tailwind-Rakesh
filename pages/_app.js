import { SWRConfig } from "swr";
import { InAppLayout } from "../components/common/Layout";
import "../styles/globals.css";
import { swrFetcher } from "../lib/api/ApiClient";

function MyApp({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <InAppLayout>{page}</InAppLayout>);

  const withLayout = getLayout(<Component {...pageProps} />);

  const swrConfig = {
    fetcher: swrFetcher,
  };

  return (
    <>
      <SWRConfig value={swrConfig}>{withLayout}</SWRConfig>
    </>
  );
}

export default MyApp;
