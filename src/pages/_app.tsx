import { SessionProvider } from "next-auth/react";
import { Provider } from "zustand";
import { useStore } from "@/lib/store";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { ToastContainer } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { user, setUser } = useStore();

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta name="description" content="Track your fitness progress and stay motivated." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <ToastContainer />
      <SessionProvider session={session}>
        <Provider value={useStore}>
          <ThemeProvider enableSystem={true} attribute="class">
            <AuthContext.Provider value={{ user, setUser }}>
              <ThemeContext.Provider value={user?.theme || "light"}>
                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>
              </ThemeContext.Provider>
            </AuthContext.Provider>
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}