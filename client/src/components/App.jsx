import React from 'react';
import axios from 'axios';
import localStorage from 'local-storage';
import url from 'url';
import querystring from 'querystring';
import { averageRating, totalReviews } from '../utilities.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';
import QandA from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingAndReview from './RatingsAndReviews/RatingAndReview.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import withClickData from './withClickData.jsx';
import Title from './Title.jsx';
import Footer from './Footer.jsx';

const defaultId = 71701;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: null,
      styleId: null,
      styleIndex: null,
      productInfo: null,
      productStyles: null,
      qandaInfo: null,
      rating: null,
      reviewCount: null,
      reviewPage: null,
      characteristics: null,
      recommended: null,
      reviews: [],
      outfits: [],
      savedToOutfit: false,
      startIndex: 0,
      endIndex: null,
      thumbIndex: 0,
      theme: 'light',
    };

    this.scrollTarget = React.createRef();

    this.handleProductIdChange = this.handleProductIdChange.bind(this);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.handleThumbChange = this.handleThumbChange.bind(this);
    this.handleUpArrowClick = this.handleUpArrowClick.bind(this);
    this.handleDownArrowClick = this.handleDownArrowClick.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
    this.handleRemoveOutfitClick = this.handleRemoveOutfitClick.bind(this);
    this.toggleOutfit = this.toggleOutfit.bind(this);
    this.handleProductCardClick = this.handleProductCardClick.bind(this);
    this.executeScroll = this.executeScroll.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    const parsedUrl = url.parse(window.location.href);
    const { productId } = querystring.parse(parsedUrl.query);
    const searchId = Number(productId) || defaultId;
    this.getInitialData(searchId);
  }

  handleProductIdChange(newId) {
    // this.getInitialData(id);
    this.setState({
      productId: newId,
    });
  }

  handleStyleChange(e) {
    const { productStyles, productId, thumbIndex, startIndex } = this.state;
    let { endIndex } = this.state;
    const styleIndex = Number(e.target.getAttribute('index'));
    const styleId = productStyles[styleIndex].style_id;
    const { photos } = productStyles[styleIndex];
    if (photos.length <= thumbIndex) {
      endIndex = photos.length > 7 ? 6 : photos.length - 1;
      this.setState({
        styleIndex,
        styleId,
        startIndex: 0,
        thumbIndex: 0,
        endIndex,
      });
    } else if ((endIndex <= photos.length - 1) && (endIndex - startIndex < 6)) {
      endIndex = photos.length > 7 ? 6 + startIndex : photos.length - 1;
      this.setState({
        styleIndex,
        styleId,
        endIndex,
      });
    } else {
      this.setState({
        styleIndex,
        styleId,
      });
    }
    window.history.pushState({ productId }, '', `?productId=${productId}&styleId=${styleId}`);
  }

  handleThumbChange(e) {
    e.stopPropagation();
    const thumbIndex = Number(e.target.getAttribute('thumbindex'));
    this.setState({
      thumbIndex,
    });
  }

  handleUpArrowClick(e) {
    e.stopPropagation();
    const {
      startIndex,
      endIndex,
      thumbIndex,
    } = this.state;
    if (thumbIndex > startIndex) {
      this.setState({
        thumbIndex: thumbIndex - 1,
      });
    } else {
      this.setState({
        startIndex: startIndex - 1,
        endIndex: endIndex - 1,
        thumbIndex: thumbIndex - 1,
      });
    }
  }

  handleDownArrowClick(e) {
    e.stopPropagation();
    const {
      startIndex,
      endIndex,
      thumbIndex,
    } = this.state;
    if (thumbIndex < endIndex) {
      this.setState({
        thumbIndex: thumbIndex + 1,
      });
    } else {
      this.setState({
        startIndex: startIndex + 1,
        endIndex: endIndex + 1,
        thumbIndex: thumbIndex + 1,
      });
    }
  }

  handleProductCardClick(id) {
    this.getInitialData(id);
  }

  handleAddOutfitClick(e) {
    e.preventDefault();
    const {
      productInfo, productStyles, outfits, productId, rating,
    } = this.state;

    // check for duplicates
    let isDuplicate = false;
    outfits.forEach((product) => {
      if (product.id === productId) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      // Combine Product Info and Styles to one object
      const currentProduct = productInfo;
      currentProduct.styles = productStyles;
      currentProduct.rating = rating;

      // create new array for local storage
      const updatedOutArr = outfits.slice();
      updatedOutArr.push(currentProduct);

      // add to local storage
      localStorage.set('outfitList', updatedOutArr);
      this.setState({
        outfits: updatedOutArr,
        savedToOutfit: true,
      });
    }
  }

  handleRemoveOutfitClick(e) {
    e.preventDefault();
    const { outfits, productId } = this.state;

    const currOutfits = outfits.slice();
    const updatedOutArr = currOutfits.filter((value) => value.id !== Number(e.target.getAttribute('value')));
    const savedToOutfit = Number(e.target.getAttribute('value')) === productId;
    localStorage.set('outfitList', updatedOutArr);
    if (savedToOutfit) {
      this.setState({
        outfits: updatedOutArr,
        savedToOutfit: false,
      });
    }
    if (!savedToOutfit) {
      this.setState({
        outfits: updatedOutArr,
      });
    }
  }

  getInitialData(productId) {
    let productInfo; let productStyles; let
      qandaInfo; let styleId; let endIndex;
    let styleIndex = 0;
    axios.get(`/productinfo/${productId}`)
      .then((results) => {
        productInfo = results.data;
      })
      .then(() => {
        axios.get(`/styles/${productId}`)
          .then((results) => {
            productStyles = results.data.results;
            const parsedUrl = url.parse(window.location.href);
            const parsedQs = querystring.parse(parsedUrl.query);
            const firstStyle = productStyles[0];
            if (parsedQs.styleId) {
              styleId = parsedQs.styleId;
              for (var i = 0; i < productStyles.length; i += 1) {
                if (productStyles[i]['default?']) {
                  productStyles[0] = productStyles[i];
                  productStyles[i] = firstStyle;
                  if (productStyles[0].style_id === Number(styleId)) {
                    styleIndex = 0;
                  }
                }
                if (productStyles[i].style_id === Number(styleId)) {
                  styleIndex = i;
                }
              }
            } else {
              for (let i = 0; i < productStyles.length; i += 1) {
                if (productStyles[i]['default?']) {
                  productStyles[0] = productStyles[i];
                  styleId = productStyles[i].style_id;
                  productStyles[i] = firstStyle;
                  break;
                }
              }
            }
            const { photos } = productStyles[styleIndex];
            endIndex = photos.length > 7 ? 6 : photos.length - 1;
          })
          .then(() => {
            axios.get(`/qanda/${productId}`)
              .then((results) => {
                qandaInfo = results.data;
              })
              .then(() => {
                axios.get(`/reviews/${productId}`)
                  .then((results) => {
                    const { ratings } = results.data;
                    const outfits = localStorage.get('outfitList') || [];
                    const savedToOutfit = outfits.reduce((prevValue, outfit) => {
                      if (outfit.id === productId) { return true; }
                      return false;
                    }, false);
                    this.setState({
                      productId,
                      productInfo,
                      productStyles,
                      styleId,
                      styleIndex,
                      qandaInfo,
                      rating: averageRating(ratings),
                      reviewCount: totalReviews(ratings),
                      characteristics: results.data.characteristics,
                      recommended: results.data.recommended,
                      outfits,
                      savedToOutfit,
                      startIndex: 0,
                      thumbIndex: 0,
                      endIndex,
                    });
                    window.history.pushState({ productId }, '', `?productId=${productId}&styleId=${styleId}`);
                  })
                  .then(() => {
                    // both /review endpoints will be swapped at a later date
                    axios.get(`/reviews/meta/${productId}`)
                      .then((result) => {
                        this.setState({
                          reviewPage: result.data.page,
                          reviews: result.data.results,
                        });
                      });
                  });
              });
          });
      });
  }

  toggleOutfit(e) {
    e.preventDefault();
    const { savedToOutfit } = this.state;
    if (!savedToOutfit) {
      this.handleAddOutfitClick(e);
    }
    if (savedToOutfit) {
      this.handleRemoveOutfitClick(e);
    }
  }

  toggleTheme(e) {
    e.preventDefault();
    const { theme } = this.state;
    let toggleValue = theme === 'light' ? 'dark' : 'light';
    this.setState({
      theme: toggleValue,
    });
    window.scrollTo(0, 0);
  }

  // getInitialData(productId) {
  //   const req1 = axios.get(`/productinfo/${productId}`);
  //   const req2 = axios.get(`/styles/${productId}`);
  //   const req3 = axios.get(`/qanda/${productId}`);
  //   const req4 = axios.get(`/reviews/${productId}`);

  //   const requests = [req1, req2, req3, req4];

  //   axios.all(requests).then(axios.spread((res1, res2, res3, res4) => {
  //     this.setState({
  //       productInfo: res1.data,
  //       productStyles: res2.data.results,
  //       qandaInfo: res3.data,
  //       rating: averageRating(res4.data),
  //       reviewCount: totalReviews(res4.data),
  //       outfits: localStorage.get('outfitList') || [],
  //     });
  //   }));
  // }

  executeScroll() {
    this.scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const ProductOverviewWithClickData = withClickData(ProductOverview);
    const RelatedProductsWithClickData = withClickData(RelatedProducts);
    const OutfitListWithClickData = withClickData(OutfitList);
    const QandAWithClickData = withClickData(QandA);
    const RatingAndReviewWithClickData = withClickData(RatingAndReview);
    const TitleWithClickData = withClickData(Title);
    const FooterWithClickData = withClickData(Footer);

    const {
      productId,
      productInfo,
      styleIndex,
      productStyles,
      qandaInfo,
      rating,
      reviewCount,
      reviewPage,
      reviews,
      characteristics,
      recommended,
      outfits,
      savedToOutfit,
      startIndex,
      endIndex,
      thumbIndex,
      theme,
    } = this.state;

    if (!productInfo || !productStyles) {
      return <div />;
    }

    return (
      <div className="app" id={theme}>
        <ErrorBoundary>
          <TitleWithClickData toggleTheme={this.toggleTheme} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProductOverview
            key={productInfo.id}
            productInfo={productInfo}
            productStyles={productStyles}
            styleIndex={styleIndex}
            startIndex={startIndex}
            endIndex={endIndex}
            thumbIndex={thumbIndex}
            rating={rating}
            reviewCount={reviewCount}
            savedToOutfit={savedToOutfit}
            handleStyleChange={this.handleStyleChange}
            handleThumbChange={this.handleThumbChange}
            handleUpArrowClick={this.handleUpArrowClick}
            handleDownArrowClick={this.handleDownArrowClick}
            toggleOutfit={this.toggleOutfit}
            executeScroll={this.executeScroll}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <RelatedProducts
            productId={productId}
            currProduct={productInfo}
            handleProductCardClick={this.handleProductCardClick}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <OutfitListWithClickData
            productInfo={productInfo}
            productStyles={productStyles}
            outfits={outfits}
            handleAddOutfitClick={this.handleAddOutfitClick}
            handleRemoveOutfitClick={this.handleRemoveOutfitClick}
            rating={rating}
            theme={theme}
          />
        </ErrorBoundary>
        <ErrorBoundary>
          <QandAWithClickData
            info={qandaInfo}
            product={productInfo.name}
          />
        </ErrorBoundary>
        <div ref={this.scrollTarget} className="scroll-target-div">
          <ErrorBoundary>
            <RatingAndReviewWithClickData
              reviews={reviews}
              page={reviewPage}
              product={productInfo.name}
              productId={productId}
              characteristics={characteristics}
              recommended={recommended}
            />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <FooterWithClickData toggleTheme={this.toggleTheme} theme={theme} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

// Automerge