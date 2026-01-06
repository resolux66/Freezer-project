import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import openFreezer from "../assets/openFreezer.png";

function FreezerContent() {
  const navigate = useNavigate();
  const onClick = (event) => {
    event.preventDefault();
    navigate("/drawer");
  };

  return (
    <div>
      <h1>Freezer Content</h1>
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
            onClick={onClick}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,126,255,173"
            onClick={onClick}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,190,255,234"
            onClick={onClick}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,251,255,297"
            onClick={onClick}
            href="#"
            title="Open me"
          />
          <area
            shape="rect"
            coords="110,310,255,362"
            onClick={onClick}
            href="#"
            title="Open me"
          />
        </map>
      </div>

      <section>
        <Link to="/">
          <button>Close Freezer</button>
        </Link>
        <button>Find</button>
      </section>
    </div>
  );
}

export default FreezerContent;
