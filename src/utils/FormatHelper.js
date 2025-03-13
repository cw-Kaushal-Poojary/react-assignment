/** Extract required fields */
const extractCarDetails = (cars) => {
  return cars.map((car) => {
    const { imageUrl, carName, kmNumeric, fuel, areaName, cityName, price, priceNumeric } = car;
    return { imageUrl, carName, kmNumeric, fuel, areaName, cityName, price, priceNumeric };
  });
};

export { extractCarDetails };