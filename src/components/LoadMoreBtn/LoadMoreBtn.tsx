import css from "./LoadMoreBtn.module.css";
import React, { MouseEventHandler } from "react";

interface LoadMoreBtnProp {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProp> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.loading} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
