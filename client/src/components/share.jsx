import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class Share extends React.Component {
  constructor(props) {
    super(props);

    console.log(typeof window.location.href);
    let tempLink = window.location.href;
    const ind = tempLink.indexOf('/results/');
    let adjustedLink = '';

    if (ind !== -1) {
      tempLink = tempLink.substr(0, ind) + tempLink.substr(ind+8);
    }

    this.state = ({
      link: tempLink,
    });

    $(function () {
      $('[data-toggle="popover"]').popover()
    });

    $('.popover-dismiss').popover({
      trigger: 'focus'
    });
  }

  render() {
    return (
      <div className="share-container">

        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="copyLabel">Share this poll!</span>
          </div>
          <input disabled={true} type="text" className="form-control" id="copyText" value={this.state.link} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <CopyToClipboard text={this.state.link} onCopy={this.onCopy}>
              <a tabIndex="0" className="btn btn-outline-secondary" role="button" id="copyButton" data-toggle="popover" data-trigger="focus" data-content="Copied!" data-placement="bottom">Copy</a>
            </CopyToClipboard>
          </div>
        </div>

      </div>
    );
  }
}

export default Share;