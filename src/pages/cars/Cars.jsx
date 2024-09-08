import { useEffect } from "react";

// STYLeS //
import styles from "./Cars.module.css";

// COMPONENTS //
import CarCard from "../../components/Car-Card/CarCard";
import Filters from "../../components/Filters/Filters";

// CONTEXT //
import { useCarContext } from "../../Contexts/CarContext";

// UTILS //
import sortCars from "../../utils/SortHelper";
import { extractCarDetails } from "../../utils/FormatHelper";

// CONSTANTS //
import { CARS_URL, DUMMY_URL } from "../../Constants";

const Cars = () => {
  const { filters, sortOption, setSortOption, cars, setCars } = useCarContext();

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      // let url = CARS_URL;
      let url = DUMMY_URL;
      // url += `?budget=${filters.minBudget}-${filters.maxBudget}`;

      // if (filters.fuel.length > 0) {
      //   url += `&fuel=${filters.fuel.join("+")}`;
      // }

      const response = await fetch(url);
      const data = await response.json();
      const extractedCarDetails = extractCarDetails(data.stocks);

      const sortedCars = sortCars(extractedCarDetails, sortOption);
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
