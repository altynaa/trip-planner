import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout/Layout";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/store";
import { GOOGLE_CLIENT_ID } from "../../constants";
import { addInterceptors } from "../../axiosApi";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme";

addInterceptors(store);

export default function App({ Component, pageProps }: AppProps) {
  return(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
