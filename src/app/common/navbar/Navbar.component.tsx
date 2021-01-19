import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import "./Navbar-ar.scss";

export interface IProps {
  List: any[];
}

export const Navbar = (props: IProps) => {
  return (
    <div className="topNavContainer container">
      <nav className="topNav">
        <ul className="flex">
          {props.List.map((obj) => {
            let activeClass =
              window.location.pathname.indexOf(obj.Link) > -1 ? "active" : "";
            return (
              obj.isActive && (
                <li key={obj.Id}>
                  <Link className={activeClass} to={obj.Link}>
                    {obj.Name}
                  </Link>
                </li>
              )
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
