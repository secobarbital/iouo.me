var React = require('react');

var Content = React.createClass({
    render: function() {
        return (
    <div className="content">
      <p className="content-padded">Thanks for downloading Ratchet. This is an example HTML page thats linked up to compiled Ratchet CSS and JS, has the proper meta tags and the HTML structure. Need some more help before you start filling this with your own content? Check out some Ratchet resources:</p>
      <div className="card">
        <ul className="table-view">
          <li className="table-view-cell">
            <a className="push-right" href="http://goratchet.com">
              <strong>Ratchet documentation</strong>
            </a>
          </li>
          <li className="table-view-cell">
            <a className="push-right" href="https://github.com/twbs/ratchet/">
              <strong>Ratchet on Github</strong>
            </a>
          </li>
          <li className="table-view-cell">
            <a className="push-right" href="https://groups.google.com/forum/#!forum/goratchet">
              <strong>Ratchet Google group</strong>
            </a>
          </li>
          <li className="table-view-cell">
            <a className="push-right" href="https://twitter.com/goratchet">
              <strong>Ratchet on Twitter</strong>
            </a>
          </li>
        </ul>
      </div>
    </div>
        );
    }
});

module.exports = Content;
