const sortCars = (carsList, option) => {
  switch (option) {
    case "priceasc":
      return [...carsList].sort(
        (a, b) => Number(a.priceNumeric) - Number(b.priceNumeric)
      );
    case "pricedesc":
      return [...carsList].sort(
        (a, b) => Number(b.priceNumeric) - Number(a.priceNumeric)
      );
    default:
      return carsList;
  }
};

export default sortCars;