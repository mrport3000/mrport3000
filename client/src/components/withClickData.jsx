import React from 'react';
import axios from 'axios';

function withClickData(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleSiteClick = this.handleSiteClick.bind(this);
    }

    handleSiteClick(e) {
      const currentDate = new Date();
      axios.post('/interactions', {
        element: e.target.tagName,
        widget: getDisplayName(WrappedComponent),
        time: currentDate.toString().split(' ')[4],
      })
        .then((result) => console.log('Posted Click: ', result))
        .catch((err) => console.log(err));
    }

    render() {
      return (
        <div onClickCapture={this.handleSiteClick} className="HOC-div">
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default withClickData;
