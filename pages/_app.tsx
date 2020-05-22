import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import withApollo from '@lib/withApollo';
import { initialStateUI, UIReducer } from '@reducers/UIReducer';
import { UIProvider } from '@contexts/UIContext';
import 'styles/tailwind.css';
import 'styles/_global.scss';
import Navbar from '@components/navigation/Navbar';
import 'typeface-roboto';
import 'typeface-playfair-display';

interface IProps {
  apollo: ApolloClient<any>,
}

class MyApp extends App<IProps> {
  render() {
    const { Component, pageProps, apollo } = this.props;

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
        <ApolloProvider client={apollo}>
          <UIProvider initialState={initialStateUI} reducer={UIReducer}>
            <div id="panel">
              <Navbar />
              <div id="page-wrap">
                <Component {...pageProps} />
              </div>
            </div>
          </UIProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
