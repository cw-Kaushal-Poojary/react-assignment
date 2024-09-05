import styles from "./Cars.module.css";

// Import filter image
import filterIcon from "../../assets/filter.png";
import CarCard from "../../components/Car-Card/CarCard";
import { useEffect, useState } from "react";

const Cars = () => {
  const fuelOptions = [
    {
      id: 1,
      name: "Petrol",
    },
    {
      id: 2,
      name: "Diesel",
    },
    {
      id: 3,
      name: "CNG",
    },
    {
      id: 4,
      name: "LPG",
    },
    {
      id: 5,
      name: "Electric",
    },
    {
      id: 6,
      name: "Hybrid",
    },
  ];

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/c/3151-8062-475b-8f20"
      );
      const data = await response.json();
      setCars(data.stocks);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(cars);
  return (
    <div className={styles["cars-container"]}>
      <div className={styles["filter-container"]}>
        <div className={styles["filter-header"]}>
          <div className={styles["filter-text"]}>
            <span className={styles["filter-icon"]}>
              <img src={filterIcon} alt="" height={20} width={20} />
            </span>
            Filters
          </div>
          <button className={styles["clear-button"]}>Clear All</button>
        </div>
        <div className={styles["filter-section"]}>
          <div className={styles["filter-title"]}>Budget (Lakh)</div>
          <div className={styles["filter-budget"]}>
            <input type="number" placeholder="0" className={styles["input"]} />
            <span className={styles["dash"]}>-</span>
            <input type="number" placeholder="21" className={styles["input"]} />
          </div>
        </div>
        <div className={styles["filter-section"]}>
          <div className={styles["filter-title"]}>Fuel</div>
          <ul className={styles["fuel-options"]}>
            {fuelOptions?.map((fuelOption) => (
              <li key={fuelOption.id}>
                <input type="checkbox" /> {fuelOption.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles["sort-car-wrap"]}>
        <div className={styles["sort-cars"]}>
          <span>Sort By: </span>
          <select name="cars" id="cars">
            <option value="volvo">Best Match</option>
            <option value="saab">Price - Low to High</option>
            <option value="mercedes">Price - High to Low</option>
            <option value="audi">Year - Newest to Oldest</option>
            <option value="audi">Km - Low to High</option>
            <option value="audi">Km - High to Low</option>
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
