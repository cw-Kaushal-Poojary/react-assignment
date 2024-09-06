import styles from "./Cars.module.css";

// Import filter image
import filterIcon from "../../assets/filter.png";
import CarCard from "../../components/Car-Card/CarCard";
import { useEffect, useState } from "react";
import { CARS_URL } from "../../Constants";

const Cars = () => {
  const fuelOptions = [
    { id: 1, name: "Petrol" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "CNG" },
    { id: 4, name: "LPG" },
    { id: 5, name: "Electric" },
    { id: 6, name: "Hybrid" },
  ];

  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(CARS_URL);
      const data = await response.json();
      setCars(data.stocks);
      setOriginalCars(data.stocks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sortedCars;
    switch (option) {
      case "priceasc":
        sortedCars = [...cars].sort(
          (a, b) => Number(a.priceNumeric) - Number(b.priceNumeric)
        );
        setCars(sortedCars);
        break;
      case "pricedesc":
        sortedCars = [...cars].sort(
          (a, b) => Number(b.priceNumeric) - Number(a.priceNumeric)
        );
        setCars(sortedCars);
        break;
      default:
        setCars(originalCars);
    }
  };

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
            <input
              type="number"
              placeholder="0"
              className={styles["input"]}
              defaultValue={0}
            />
            <span className={styles["dash"]}>-</span>
            <input
              type="number"
              placeholder="21"
              className={styles["input"]}
              defaultValue={50}
            />
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
