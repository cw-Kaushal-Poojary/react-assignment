import { useEffect, useState } from "react";

// STYLES //
import styles from "./filters.module.css";

// ICONS //
import filterIcon from "../../assets/filter.png";

// CONTEXT //
import { useCarContext } from "../../Contexts/CarContext";

const Filters = () => {
  const fuelOptions = [
    { id: 1, name: "Petrol" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "CNG" },
    { id: 4, name: "LPG" },
    { id: 5, name: "Electric" },
    { id: 6, name: "Hybrid" },
  ];

  const { filters, setFilters } = useCarContext();
  const [minBudget, setMinBudget] = useState(filters.minBudget);
  const [maxBudget, setMaxBudget] = useState(filters.maxBudget);
  const [selectedFuels, setSelectedFuels] = useState(filters.fuel);

  useEffect(() => {
    // Update the context when filters change
    setFilters({
      minBudget,
      maxBudget,
      fuel: selectedFuels,
    });
  }, [selectedFuels, setFilters]);

  const handleBudgetChange = () => {
    if (Number(minBudget) > Number(maxBudget)) {
      alert("Min budget cannot be greater than max budget");
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      minBudget,
      maxBudget,
    }));
  };

  const handleFuelChange = (fuelId) => {
    if (selectedFuels.includes(fuelId)) {
      // The fuel is unchecked so remove it from the selected fuels
      const fuelsSelected = selectedFuels.filter((fuel) => fuel !== fuelId);
      setSelectedFuels(fuelsSelected);
    } else {
      setSelectedFuels([...selectedFuels, fuelId]);
    }
  };

  const handleClearFilters = () => {
    setMinBudget(0);
    setMaxBudget(50);
    setSelectedFuels([]);
    setFilters({
      minBudget: 0,
      maxBudget: 50,
      fuel: [],
    });
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-header"]}>
        <div className={styles["filter-text"]}>
          <span className={styles["filter-icon"]}>
            <img src={filterIcon} alt="" height={20} width={20} />
          </span>
          Filters
        </div>
        <button className={styles["clear-button"]} onClick={handleClearFilters}>
          Clear All
        </button>
      </div>
      <div className={styles["filter-section"]}>
        <div className={styles["filter-title"]}>Budget (Lakh)</div>
        <div className={styles["filter-budget"]}>
          <input
            type="number"
            placeholder="0"
            className={styles["input"]}
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
            onBlur={handleBudgetChange}
          />
          <span className={styles["dash"]}>-</span>
          <input
            type="number"
            placeholder="50"
            className={styles["input"]}
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            onBlur={handleBudgetChange}
          />
        </div>
      </div>
      <div className={styles["filter-section"]}>
        <div className={styles["filter-title"]}>Fuel</div>
        <ul className={styles["fuel-options"]}>
          {fuelOptions?.map((fuelOption) => (
            <li key={fuelOption.id}>
              <input
                type="checkbox"
                checked={selectedFuels.includes(fuelOption.id)}
                onChange={() => handleFuelChange(fuelOption.id)}
              />
              {fuelOption.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
