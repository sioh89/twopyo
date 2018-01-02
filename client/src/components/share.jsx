import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class Share extends React.Component {
  render() {
    return (
      <div className="share-container">

        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="copyLabel">Share this poll!</span>
          </div>
          <input disabled={true} type="text" className="form-control" id="copyText" value={window.location.href} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <CopyToClipboard text={window.location.href} onCopy={this.onCopy}>
              <button className="btn btn-outline-secondary" id="copyButton" type="button">Copy</button>
            </CopyToClipboard>
          </div>
        </div>

      </div>
    );
  }
}

export default Share;