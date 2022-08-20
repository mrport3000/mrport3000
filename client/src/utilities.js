/* eslint-disable no-var */
module.exports = {
  averageRating(ratings) {
    const total = Object.keys(ratings).reduce(
      (sum, key) => sum + Number.parseInt(ratings[key], 10) * key, 0);
    const reviewCount = Object.values(ratings).reduce(
      (sum, value) => sum + Number.parseInt(value, 10), 0);
    return Math.round((total / reviewCount) * 100) / 100;
  },
  totalReviews(ratings) {
    return Object.values(ratings).reduce(
      (sum, value) => sum + Number.parseInt(value, 10), 0);
  },
  availableSizes(skus) {
    var sizes = [];
    Object.values(skus).forEach((sku) => {
      if (sku.quantity > 0) {
        sizes.push(sku.size);
      }
    });
    return sizes;
  },
};
