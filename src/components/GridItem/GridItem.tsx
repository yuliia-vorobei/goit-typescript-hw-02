import css from "./GridItem.module.css";
import React from "react";

export const GridItem = ({ children }) => {
  return <li className={css.item}>{children}</li>;
};
