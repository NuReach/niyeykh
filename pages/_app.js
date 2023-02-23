import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

import { StoreProvider } from "./utils/Store";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </StoreProvider>
  );
}
