import React from 'react';
import * as inputLogo from '../assets/globe.svg';
import * as favicon from '../assets/favicon.ico';
import { Card } from '../components/card';
import { Toast } from '../components/toast';
import { link } from '../config.pages.json';

export class Index extends React.Component {
  private hostLink: string;

  constructor() {
    super({});
    this.hostLink =
      process.env.NODE_ENV === 'production'
        ? link.production
        : link.development;
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Index | URL Shortener</title>
          <link rel="canonical" href="https://heaplinker.com/" />
          <link rel="shortcut icon" href={favicon.default} />
          <link rel="stylesheet" href={`${this.hostLink}index.min.css`} />
        </head>
        <body id="root">
          <div className="container">
            <div className="main-body">
              <input
                id="insertedURL"
                className="inp"
                type="text"
                placeholder="Input URL..."
              />
              <a className="btn" id="shortBtn">
                <img src={inputLogo.default} alt="url shortener icon" />
              </a>
            </div>
            <Card />
          </div>
          <Toast />
          <script src={`${this.hostLink}index.min.js`}></script>
        </body>
      </html>
    );
  }
}
