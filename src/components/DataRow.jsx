import { useState } from 'react';

const DataRow = ({
  data,
  inEditMode,
  setInEditMode,
  setData,
  selectedIds,
  setSelectedIds,
}) => {
  const getValues = (item) => {
    const data = [];
    for (const property in item) {
      if (property === 'id') {
        continue;
      } else {
        data.push(item[property]);
      }
    }

    return data;
  };

  const getKeys = (item) => {
    const data = {};
    for (const property in item) {
      if (property === 'id') {
        continue;
      } else {
        data[property] = item[property];
      }
    }

    return data;
  };

  const getKeysArray = (item) => {
    const data = [];
    for (const property in item) {
      if (property === 'id') {
        continue;
      } else {
        data.push(property);
      }
    }

    return data;
  };

  const isChecked = () => {
    if (selectedIds.includes(data.id)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelect = (e) => {
    const idx = selectedIds.indexOf(data.id);
    if (idx === -1) {
      setSelectedIds((state) => {
        const newState = [...state];
        newState.push(data.id);

        return newState;
      });
    } else {
      setSelectedIds((state) => {
        const newState = [...state];
        newState.splice(idx, 1);

        return newState;
      });
    }
  };

  const keys = getKeysArray(data);

  const [inputState, setInputState] = useState(getKeys(data));

  const tableData = getValues(data);

  return (
    <tr>
      <td className='checkbox'>
        <input
          type="checkbox"
          id={data.id}
          checked={isChecked()}
          onChange={handleSelect}
        />
      </td>
      {tableData.map((dataItem, idx) => {
        if (inEditMode.status && inEditMode.rowKey === data.id) {
          return (
            <td key={idx} className="edit-item">
              <input
                type="text"
                id={`${keys[idx]}`}
                value={inputState[keys[idx]]}
                onChange={(e) => {
                  setInputState((state) => ({
                    ...state,
                    [e.target.id]: e.target.value,
                  }));
                }}
              />
            </td>
          );
        }
        return <td key={idx}>{dataItem}</td>;
      })}
      <td className='actions'>
        {inEditMode.status && inEditMode.rowKey === data.id ? (
          <button
            onClick={() => {
              setData((state) => {
                const newState = [...state];
                const idx = newState.findIndex((item) => item.id === data.id);
                newState[idx] = { ...inputState, id: data.id };
                setInEditMode(() => ({ status: false, rowKey: null }));

                return newState;
              });
            }}
            className="save"
          >
            Save
          </button>
        ) : (
          <button
            onClick={(e) =>
              setInEditMode((state) => ({
                status:
                  state.rowKey === null
                    ? true
                    : data.id === state.rowKey
                    ? !state.status
                    : state.status,
                rowKey:
                  state.status && state.rowKey === data.id ? null : data.id,
              }))
            }
            className="edit"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            setData((state) => {
              const newState = [...state];
              const idx = newState.findIndex((item) => item.id === data.id);
              newState.splice(idx, 1);

              return newState;
            });
          }}
          className="delete"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DataRow;
