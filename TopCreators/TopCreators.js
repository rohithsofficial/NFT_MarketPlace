export const getTopCreators = (creators) => {
  if (!Array.isArray(creators) || creators.length === 0) {
    console.error("Error: creators is not a valid array", creators);
    return [];
  }

  const finalCreators = [];

  const finalResults = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );

    return index;
  }, {});

  Object.entries(finalResults).forEach((item) => {
    const seller = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    finalCreators.push({ seller, total });
  });

  return finalCreators;
};
