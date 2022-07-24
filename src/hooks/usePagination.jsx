import { useMemo } from 'react';

export const usePagination = ({ total, numRows, page, siblings = 1 }) => {
  const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const firstPage = 1;
    const lastPage = Math.ceil(total / numRows);
    const totalPageNums = siblings + 5;

    if (totalPageNums >= lastPage) {
      return range(1, lastPage);
    }

    const leftSiblingIdx = Math.max(page - siblings, 1);
    const rightSiblingIdx = Math.min(page + siblings, lastPage);

    const showLeftDots = leftSiblingIdx > 2;
    const showRightDots = lastPage - rightSiblingIdx >= 2;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 2 + 2 * siblings;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, '...', lastPage];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 2 + 2 * siblings;
      const rightRange = range(lastPage - rightItemCount + 1, lastPage);

      return [firstPage, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const midRange = range(leftSiblingIdx, rightSiblingIdx);

      return [firstPage, '...', ...midRange, '...', lastPage];
    }
  }, [total, numRows, page, siblings]);

  return paginationRange;
};
