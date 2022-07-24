import { useEffect, useMemo, useState } from 'react';

import { baseURL, fetchApi } from './services/api';
import AdminTable from './components/AdminTable';
import './App.scss';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');

  const numRows = 10;

  const fetchData = async () => {
    const data = await fetchApi(baseURL);
    // console.log(data);

    return data;
  };

  useEffect(() => {
    fetchData().then((res) => setData([...res]));
  }, []);

  const filteredData = useMemo(() => {
    const filterData = () => {
      const newData = data.filter((item) => {
        if (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.role.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });

      return newData;
    };

    const newData = filterData();

    return newData;
  }, [data, search]);

  const currentData = useMemo(() => {
    const firstRowIdx = (page - 1) * numRows;
    const lastRowIdx =
      firstRowIdx + numRows < filteredData.length
        ? firstRowIdx + numRows
        : filteredData.length;

    console.log(lastRowIdx);

    return filteredData.slice(firstRowIdx, lastRowIdx);
  }, [page, filteredData]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <div className="search__container">
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, email or role"
        />
      </div>
      <AdminTable
        data={currentData}
        setData={setData}
        page={page}
        total={search === '' ? data.length : filteredData.length}
        numRows={numRows}
        onPageChange={(page) => setPage(page)}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
}

export default App;
