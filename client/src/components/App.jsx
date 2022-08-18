import React from 'react';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        Place Widgets here:
        <RelatedProducts />
        <OutfitList />
      </div>
    );
  }
}

export default App;
