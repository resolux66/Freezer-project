import { createContext, useContext, useEffect, useReducer } from "react";
import { FREEZER_DATA } from "../data";

const FreezerContext = createContext();

const STORAGE_KEY = "freezerData";

function freezerReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return state.map((drawer) =>
        drawer.id === action.drawerId
          ? {
              ...drawer,
              items: [
                ...drawer.items,
                {
                  id: crypto.randomUUID(),
                  name: action.name,
                  dateAdded: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : drawer
      );
    default:
      return state;
  }
}

export function FreezerProvider({ children }) {
  //Load from localStorage or use default FREEZER_DATA
  const [freezerData, dispatch] = useReducer(freezerReducer, null, () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    //Import your initial FREEZER_DATA here
    return FREEZER_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(freezerData));
  }, [freezerData]);

  return (
    <FreezerContext.Provider value={{ freezerData, dispatch }}>
      {children}
    </FreezerContext.Provider>
  );
}

export function useFreezer() {
  return useContext(FreezerContext);
}
