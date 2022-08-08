/* eslint-disable no-shadow */
import { useState } from 'react';

export const usePagination = (maxPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentPage, maxPage };
};
