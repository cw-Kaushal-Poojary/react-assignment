import styles from "./car-cards.module.css"; // Import the CSS file
import testCar from "../../assets/test-car.jpg"; // Import the test car image

const CarCard = ({ car }) => {
  return (
    <div className={styles["car-card"]}>
      <div className={styles["card-inner"]}>
        <img
          className={styles["card-image"]}
          src={car?.imageUrl || testCar}
          alt="blog"
          height={100}
          width={100}
        />
        <div className={styles["card-content"]}>
          <h3 className={styles["card-title"]}>{car?.carName}</h3>
          <p className={styles["card-description"]}>
            {car?.kmNumeric}km | {car.fuel} | {car?.areaName}, {car?.cityName}
          </p>
          <p className={styles["price"]}>Rs 12.5 Lakh</p>
          <div className={styles["btn-wrap"]}>
            <button className={styles["seller-btn"]}>Get Seller Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
