import { Link } from "react-router-dom";
import closedFreezer from "../assets/closedFreezer.png";

export default function ClosedFreezer() {
  return (
    <div className="closedFreezerContainer">
      <h1>Our Freezer</h1>
      <Link to="/freezer">
        <img
          src={closedFreezer}
          className="closedFreezer"
          alt="Closed Freezer"
        />
      </Link>
    </div>
  );
}
