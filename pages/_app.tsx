import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
//import withApollo from '@lib/withApollo';
import { initialStateUI, UIReducer } from '@reducers/UIReducer';
import { UIProvider } from '@contexts/UIContext';
import { AuthProvider } from '@contexts/AuthContext';
import { AuthReducer } from '@reducers/AuthReducer';
import 'styles/tailwind.css';
import 'styles/_global.scss';
import Navbar from '@components/navigation/Navbar';
import 'typeface-roboto';
import 'typeface-playfair-display';
import NProgress from 'nprogress'; //nprogress module
// import 'nprogress/nprogress.css';
import Router from 'next/router';


interface IProps {
  apollo: ApolloClient<any>,

}

//Binding events.
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    console.log('pageProps', pageProps);

    const initialStateAuth = {
      isLogged: pageProps?.user !== null,
      user: pageProps?.user !== null ? pageProps?.user : {},
    };

    return (
      <>
        <Head>
          <title>FamilyCook</title>
          <meta name="theme-color" content="#08A9FA" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="google" content="notranslate" />
          <html lang="fr" />
          <meta name="google" content="notranslate" />
          {/* favicon */}
        </Head>
        {/* <ApolloProvider client={apollo}> */}
        <UIProvider initialState={initialStateUI} reducer={UIReducer}>
          <AuthProvider initialState={initialStateAuth} reducer={AuthReducer}>
            <div id="panel">
              <Navbar />
              <div id="page-wrap">
                <Component {...pageProps} />
              </div>
            </div>
          </AuthProvider>
        </UIProvider>
        {/* </ApolloProvider> */}
      </>
    );
  }
}

export default MyApp;

// export default withApollo(MyApp);
