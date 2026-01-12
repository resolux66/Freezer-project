import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFreezer } from "./FreezerContext";

export default function DrawerContent() {
  const location = useLocation();
  const { drawerId } = location.state || {};
  const { freezerData, dispatch } = useFreezer();
  const drawer = freezerData.find((d) => d.id === drawerId);
  const items = drawer?.items || [];

  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState("");

  const handleSaveItem = () => {
    if (!newItemName.trim()) return;
    dispatch({
      type: "ADD_ITEM",
      drawerId: drawer.id,
      name: newItemName.trim(),
    });
    setNewItemName("");
    setIsAdding(false);
  };

  const handleRemoveItem = (itemId) => {
    // Implement remove item functionality here
    dispatch({
      type: "REMOVE_ITEM",
      drawerId: drawer.id,
      itemId,
    });
  };

  return (
    <div>
      <h1>{drawer?.name ?? "Unknown drawer"}</h1>
      <button onClick={() => setIsAdding(true)}>Add Item</button>
      {isAdding && (
        <div className="findItem">
          <input
            autoFocus
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={handleSaveItem}>Save</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}
      <ul>
        {items.map((item) =>
          item.id ? (
            <li key={item.id}>
              {item.name} - Added on: {item.dateAdded}{" "}
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ) : null
        )}
      </ul>
      <Link to="/freezer">Close Drawer</Link>
    </div>
  );
}
