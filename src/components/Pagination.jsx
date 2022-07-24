import React from 'react';
import { usePagination } from '../hooks/usePagination';

const Pagination = ({ onPageChange, total, page, numRows, siblings = 1 }) => {
  const paginationRange = usePagination({ page, numRows, total, siblings });

  if (page === 0 || paginationRange.length < 2) {
    return null;
  }

  const handleNext = () => {
    onPageChange(page + 1);
  };

  const handlePrev = () => {
    onPageChange(page - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul>
      <li
        className={`pagination-btn ${page === 1 ? 'disabled' : ''}`}
        onClick={page === 1 ? () => console.log('First Page') : handlePrev}
      >
        Prev
      </li>
      {paginationRange.map((pageNum, idx) => {
        if (pageNum === '...') {
          return (
            <li className="pagination-btn dots" key={idx}>
              ...
            </li>
          );
        }

        return (
          <li
            className={`pagination-btn ${pageNum === page ? 'selected' : ''}`}
            onClick={() => onPageChange(pageNum)}
            key={idx}
          >
            {pageNum}
          </li>
        );
      })}
      <li
        className={`pagination-btn ${page === lastPage ? 'disabled' : ''}`}
        onClick={
          page === lastPage ? () => console.log('Last Page') : handleNext
        }
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;
