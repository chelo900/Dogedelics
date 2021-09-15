import React from "react";
import { SHOWN_PAGES } from "../constants";

export const Pagination = ({
  currentPage,
  dogsPerPage,
  dogs,
  pagination,
  handlePage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(dogs.length / dogsPerPage); i++) {
    pages.push(i);
  }
  return (
    <nav>
      <div className="pagination">
        <span>
          <button onClick={handlePage} name="prev">
            Previos page
          </button>
        </span>
        {pages && currentPage <= pages.length - SHOWN_PAGES
          ? pages
              .map((page) => (
                <span key={page}>
                  <button onClick={() => pagination(page)}>{page}</button>
                </span>
              ))
              .slice(currentPage - 1, currentPage - 1 + SHOWN_PAGES)
          : pages
              .map((page) => (
                <span key={page}>
                  <button onClick={() => pagination(page)}>{page}</button>
                </span>
              ))
              .slice(pages.length - SHOWN_PAGES)}
        <span>
          <button onClick={handlePage} name="next">
            Next page
          </button>
        </span>
      </div>
    </nav>
  );
};
