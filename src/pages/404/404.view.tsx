import React from 'react';
import * as favicon from '../assets/favicon.ico';
import { link } from '../config.pages.json';

export class _404 extends React.Component {
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
          <title>404 | URL Shortener</title>
          <link rel="canonical" href="https://heaplinker.com/" />
          <link rel="shortcut icon" href={favicon.default} />
          <link rel="stylesheet" href={`${this.hostLink}404.min.css`} />
        </head>
        <body>
          <div className="con-404">
            <div className="main-404">
              <h1>Error 404</h1>
            </div>
          </div>
          <script src={`${this.hostLink}404.min.js`}></script>
        </body>
      </html>
    );
  }
}
