import '../styles/globals.css'
import type { AppProps } from 'next/app'

import 'styles/index.css';
import { StringUtils } from 'utilities';

function MyApp({ Component, pageProps }: AppProps) {
    console.log("App start: " + StringUtils.newGuid());
    return <Component {...pageProps} />
}

export default MyApp
