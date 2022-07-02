import nProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Pages';
import '../components/styles/nprogress.css'; // having error, will import late

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
