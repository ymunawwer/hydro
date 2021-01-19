import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import isEmpty from "lodash.isempty";
import "./SideNavbar.scss";
import "./SideNavbar-ar.scss";
import { useTranslation } from "react-i18next";

export interface IProps {
  List: any[];
  title?: String;
  clickEvent?: (feature: string) => void;
  clear?: boolean;
  clearFilter?: () => void;
  type?: string;
}

export const SideNavbar = (props: IProps) => {
  const { t } = useTranslation();
  let state: string, setState: (any: string) => void;
  if (props.clear) {
    [state, setState] = useState("");
  } else {
    [state, setState] = useState("sideNavSelected0");
  }
  useEffect(
    () => {
      if (props.clear) {
        setState("");
      } else {
        setState("sideNavSelected0");
      }
    },
    [
      /* props.List */
    ]
  );
  return (
    <div className="sideNavWrapper">
      <nav className="sideNavBar">
        <ul>
          {props.title && (
            <li className="sideNavBarTitle">
              <div>
                {props.title}{" "}
                {props.clear && (
                  <>
                    {/*  */}
                    <span
                      className={`textCapital Cursor closeicon ${
                        isEmpty(state) ? "clearDisable" : "clearActive"
                      }`}
                      onClick={() => {
                        setState("");

                        props.clearFilter && props.clearFilter();
                      }}
                    >
                      {t("clear")}
                    </span>
                  </>
                )}
              </div>
            </li>
          )}
          {props.List &&
            props.List.map((obj, index) => {
              let activeMenu =
                window.location.pathname.indexOf(obj.Link) > -1
                  ? "activeSideNav"
                  : "";
              return (
                obj.isActive && (
                  <li
                    key={obj.Id}
                    className={
                      !obj.subMenu && state === "sideNavSelected" + index
                        ? "activeSubMenu"
                        : ""
                    }
                    onClick={() =>
                      !obj.subMenu && setState("sideNavSelected" + index)
                    }
                  >
                    <Link
                      className={activeMenu}
                      to={obj.Link}
                      onClick={() => {
                        (props.clickEvent && props.clickEvent(obj.Id)) ||
                          (obj.clickEvent && obj.clickEvent(obj.Id));
                      }}
                    >
                      {obj.Name}
                    </Link>
                    <ul>
                      {activeMenu === "activeSideNav" &&
                        obj.subMenu &&
                        obj.subMenu.map((item: any) => {
                          let activeSubMenu =
                            window.location.pathname.indexOf(item.Link) > -1 ||
                            props.type === item.Id
                              ? "activeSubMenu"
                              : "";
                          return (
                            item.isActive && (
                              <li key={item.Id}>
                                <Link
                                  className={activeSubMenu}
                                  to={item.Link}
                                  onClick={() => {
                                    (props.clickEvent &&
                                      props.clickEvent(item.Id)) ||
                                      (item.clickEvent &&
                                        item.clickEvent(item.Id));
                                  }}
                                  /* onClick={() =>
                                item.clickEvent && item.clickEvent(item.Id)
                              } */
                                >
                                  {item.Name}
                                </Link>
                              </li>
                            )
                          );
                        })}
                    </ul>
                  </li>
                )
              );
            })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavbar;
