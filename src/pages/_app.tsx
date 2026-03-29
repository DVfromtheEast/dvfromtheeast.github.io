import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeModeProvider } from '../context/ThemeContext'
import { LanguageProvider } from '../context/LanguageContext';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DV</title>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/da7poid94/image/upload/v1774790840/DVFavicon_vvjiz3.png"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <LanguageProvider>
        <ThemeModeProvider>
          <Component {...pageProps} />
        </ThemeModeProvider>
      </LanguageProvider>
    </>
  );
}
