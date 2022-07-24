import { useState } from 'react';
import DataRow from './DataRow';
import Pagination from './Pagination';

const AdminTable = ({
  data,
  setData,
  page,
  total,
  numRows,
  onPageChange,
  selectedIds,
  setSelectedIds,
}) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const getHeadings = (data) => {
    const dataItem = data.length ? data[0] : null;
    if (!dataItem) {
      return null;
    }

    const headings = [];

    for (const property in dataItem) {
      if (property === 'id') {
        continue;
      } else {
        headings.push(property);
      }
    }

    headings.push('actions');

    return headings;
  };

  const isAllSelected = () => {
    if (
      (selectedIds.length === numRows || selectedIds.length === data.length) &&
      selectedIds.every((id, idx) => id === data[idx].id)
    ) {
      return true;
    }
    return false;
  };

  const handleAllSelect = () => {
    if (
      (selectedIds.length === numRows || selectedIds.length === data.length) &&
      selectedIds.every((id, idx) => id === data[idx].id)
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(() => {
        const ids = [];
        for (const item of data) {
          ids.push(item.id);
        }

        return ids;
      });
    }
  };

  const handleAllDelete = () => {
    setData((state) => {
      const newState = [...state];
      return newState.filter((item) => selectedIds.indexOf(item.id) < 0);
    });
    
    setSelectedIds(() => []);
  };

  const headings = getHeadings(data);

  if (!headings) {
    return <div className="error-message">No data</div>;
  }

  return (
    <div className="admin-table__container">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected()}
                  onChange={handleAllSelect}
                />
              </th>
              {headings.map((item, idx) => (
                <th key={idx} className="table-heading">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <DataRow
                key={idx}
                data={item}
                inEditMode={inEditMode}
                setInEditMode={setInEditMode}
                setData={setData}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="controls-container">
        <button onClick={handleAllDelete}>Delete Selected</button>
        <Pagination
          page={page}
          total={total}
          numRows={numRows}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AdminTable;
