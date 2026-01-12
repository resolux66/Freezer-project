import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFreezer } from "./FreezerContext";
import openFreezer from "../assets/openFreezer.png";

export default function FreezerContent() {
  const navigate = useNavigate();
  const { freezerData } = useFreezer();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  if (!freezerData || freezerData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleFind = () => {
    if (!searchTerm.trim()) return; // don't search for empty or only whitespace
    const result = [];
    freezerData.forEach((drawer) => {
      if (!drawer.items || !drawer.items.length) return;

      const matches = drawer.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matches.length > 0) {
        result.push({ drawer: drawer, matches: matches }); // Push the entire drawer object
      }
    });
    setSearchResults(result);
  };
  const handleDrawerClick = (event, drawerId) => {
    event.preventDefault();
    navigate("/drawer", { state: { drawerId } });
  };

  return (
    <div className="freezerContent">
      <h1>Freezer Content</h1>
      <section className="findItem">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an item..."
        />
        <button onClick={handleFind}>Find</button>
      </section>
      {searchResults.length === 0 && searchTerm && (
        <p>No {searchTerm} found.</p>
      )}
      {searchResults.length > 0 && (
        <section>
          <h3>Found in:</h3>
          <ul>
            {searchResults.map(
              ({ drawer, matches }) =>
                drawer && (
                  <li key={drawer.id}>
                    {drawer.name} : {matches.length} matches
                    <ul>
                      {matches.map((item) => (
                        <li key={item.id}>
                          {item.name}- Added on {item.dateAdded}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() =>
                        navigate("/drawer", { state: { drawerId: drawer.id } })
                      }
                    >
                      Open
                    </button>
                  </li>
                )
            )}
          </ul>
        </section>
      )}

      <div>
        <img
          src={openFreezer}
          alt="Picture of Open Freezer"
          useMap="#Drawers"
          className="openFreezer"
        />
        <map name="Drawers">
          <area
            shape="rect"
            coords="110,64,255,113"
            onClick={(e) => handleDrawerClick(e, 1)}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,126,255,173"
            onClick={(e) => handleDrawerClick(e, 2)}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,190,255,234"
            onClick={(e) => handleDrawerClick(e, 3)}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,251,255,297"
            onClick={(e) => handleDrawerClick(e, 4)}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,310,255,362"
            onClick={(e) => handleDrawerClick(e, 5)}
            href="#"
            title="Open me"
          />
        </map>
      </div>

      <section>
        <Link to="/">
          <button>Close Freezer</button>
        </Link>
      </section>
    </div>
  );
}
