import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { injectable } from 'inversify'
import { container } from 'infrastructure/container';

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp;

@injectable()
class AppFactory {
    public MyApp({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />;
    }

    public bootstrap(): any {
        //return ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;
        return function MyApp({ Component, pageProps }: AppProps) {
            return <Component {...pageProps} />;
        }
    }
}

container.bind<AppFactory>(AppFactory).toSelf();
const factory = container.get<AppFactory>(AppFactory);
console.log(container);
export default factory.bootstrap();
