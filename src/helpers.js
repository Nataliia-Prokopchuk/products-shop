export const prepareUrlToTitle = (url) => ((url === '/') ? 'all' : url.substr(1));

export const computeProductKey = (product) => {
  const newProductKey = Object.keys(product.selectedAttributes).reduce(
    (accum, current) => `${accum}-${product.selectedAttributes[current]}`,
    product.id,
  );

  return newProductKey;
};

export const computeSumCountProducts = (products) => {
  const sumCountProducts = Object.keys(products).reduce(
    (accum, current) => accum + products[current].count,
    0,
  );

  return sumCountProducts;
};

export const computeSumPriceProducts = (products) => {
  const sumPriceProducts = products.reduce(
    (accum, current) => accum + current.amount * current.count,
    0,
  );

  return sumPriceProducts;
};
