import { useLocation } from "react-router-dom";
import { FREEZER_DATA } from "../data";

export default function DrawerContent() {
  const location = useLocation();
  const { drawerId } = location.state || {};
  const drawer = FREEZER_DATA.find((d) => d.id === drawerId);
  const items = drawer?.items || [];

  return (
    <div>
      <h1>{drawer?.name ?? "Unknown drawer"}</h1>
      <button>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Added on: {item.dateAdded}
          </li>
        ))}
      </ul>
    </div>
  );
}
