import styles from "./Cars.module.css";

// Import filter image
import CarCard from "../../components/Car-Card/CarCard";
import { useEffect } from "react";
import { CARS_URL } from "../../Constants";
import Filters from "../../components/Filters/Filters";
import { useCarContext } from "../../Contexts/CarContext";
import sortCars from "../../utils/SortHelper";

const Cars = () => {
  const { filters, sortOption, setSortOption, cars, setCars } = useCarContext();

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      let url = CARS_URL;
      url += `?budget=${filters.minBudget}-${filters.maxBudget}`;
      console.log(sortOption);

      if (filters.fuel.length > 0) {
        url += `&fuel=${filters.fuel.join("+")}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      const sortedCars = sortCars(data.stocks, sortOption);
      setCars(sortedCars);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedCars = sortCars(cars, option);
    setCars(sortedCars);
  };

  return (
    <div className={styles["cars-container"]}>
      <Filters />
      <div className={styles["sort-car-wrap"]}>
        <div className={styles["sort-cars"]}>
          <span>Sort By: </span>
          <select
            name="cars"
            id="cars"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Choose an option</option>
            <option value="priceasc">Price- Low to High</option>
            <option value="pricedesc">Price- High to Low</option>
          </select>
        </div>
        <div className={styles["card-container"]}>
          {cars?.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
