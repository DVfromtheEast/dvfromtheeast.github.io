import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles';
import DVTheme from '../../theme';

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
          href="https://i.ibb.co/JQX0wyY/DVFavicon.png"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>

      <ThemeProvider theme={DVTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
