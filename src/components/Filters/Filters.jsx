import styles from "./filters.module.css";
import filterIcon from "../../assets/filter.png";

const Filters = () => {
  const fuelOptions = [
    { id: 1, name: "Petrol" },
    { id: 2, name: "Diesel" },
    { id: 3, name: "CNG" },
    { id: 4, name: "LPG" },
    { id: 5, name: "Electric" },
    { id: 6, name: "Hybrid" },
  ];

  return (
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
  );
};

export default Filters;
