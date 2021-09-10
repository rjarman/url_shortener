import React from 'react';
import * as copy from '../assets/copy.svg';

export class Card extends React.Component {
  render() {
    return (
      <div className="card" id="card">
        <span>
          Shortened URL:{' '}
          <a href="http://localhost:8080/" target="_blank">
            <span id="genURL">http://localhost:8080/</span>
          </a>
        </span>
        <a className="btn" id="copyBtn">
          <img src={copy.default} alt="copy icon" />
        </a>
      </div>
    );
  }
}
