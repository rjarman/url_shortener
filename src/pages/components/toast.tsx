import React from 'react';

export class Toast extends React.Component {
  render() {
    return (
      <div className="toast" id="toast">
        <span id="toastText">URL Copied!</span>
      </div>
    );
  }
}
