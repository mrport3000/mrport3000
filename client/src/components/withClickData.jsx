import React from 'react';

function withClickData(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleSiteClick = this.handleSiteClick.bind(this);
    }

    handleSiteClick(e) {
      const currentDate = new Date();
      console.log('TIME', currentDate.toString().split(' ')[4]);
      console.log('Element', e.target);
      console.log('Module', getDisplayName(WrappedComponent));
      console.log('------');
    }

    render() {
      console.log('WRAPPED COMPONENT', WrappedComponent);
      return (
        <div onClick={this.handleSiteClick} className="HOC-div">
          <h1>hello world</h1>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}

const getDisplayName = (WrappedComponent) => WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default withClickData;
