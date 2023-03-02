import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Sort } from '../enum';
import { TableData } from '../interfaces/people-interface';

interface Props {
  headerList: string[];
  fieldNames: string[];
  data: TableData[];
  selected: string[];
  setFilter: (filter: string) => void;
  setSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteData: () => void;
}

const Table: React.FC<Props> = ({
  headerList,
  fieldNames,
  selected,
  data,
  setFilter,
  setSelected,
  deleteData
}) => {

  const [sort, setSort] = useState(Sort.DEFAULT);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const PAGE_SIZE = 5;
  const MAX_PAGE = data.length ? Math.ceil(data?.length / PAGE_SIZE) : 1;

  const nextPage = () => {
    if (page === MAX_PAGE) return;
    setPage(page + 1);
    setStart(start + PAGE_SIZE);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setStart(start - PAGE_SIZE);
  };

  const renderTableHeader = () => {
    return Array.from(headerList)
    .map((header, index) => (<th key={`header-field-${index}`} onClick={() => handleSort(index)}> {header} {index === 1 && !!sort && `(${sort})`} </th>))
  };

  const handleSort = (index: number) => {
    if (index !== 1) return;

    switch(sort) {
      case Sort.DEFAULT:
        setSort(Sort.ASC);
        break;
      case Sort.ASC:
        setSort(Sort.DESC);
        break;
      case Sort.DESC:
        setSort(Sort.DEFAULT);
        break;
    }
    
  }

  const renderData = useCallback(() => {
    if (!data.length) {
      return <tr><td colSpan={headerList.length}>No data found</td></tr>;
    }

    let newData = [...data]
      .filter((_, index) => index >= start && index < (PAGE_SIZE * page));


    if (sort === Sort.ASC) {
      newData = newData.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sort === Sort.DESC) {
      newData = newData.sort((a, b) => a.firstName > b.firstName ? -1 : 1);
    }

    return newData
      .map((people: TableData) => (
        <tr key={people.entryId}>
          { fieldNames && fieldNames.map(fieldName => (
            fieldName === 'entryId' ?
              (<td key={fieldName}>
                <input
                    type="checkbox" value={people.entryId}
                    aria-label={`people-select-${people.entryId}`}
                    onChange={setSelected}
                    />
              </td>) :
              <td key={fieldName}> {people[fieldName as keyof TableData]} </td>
          )) }
        </tr>
    ));
  }, [data, page, start, sort]);

  const renderPagination = useCallback(() => {
    return (
      <div className="bg-slate-100 p-2 flex gap-3 justify-end items-center">
        <button type="button"  data-testid="table-prev-page-btn" className="button bg-slate-300" onClick={prevPage}> &lt; </button>
        <span className="text-xs" data-testid="table-page-info">Page: {page} of {MAX_PAGE}</span>
        <button type="button" data-testid="table-next-page-btn" className="button bg-slate-300" onClick={nextPage}> &gt; </button>
      </div>
    );
  }, [page, data]);

  return (
    <div className="data-wrapper" data-testid="table-wrapper">
      <div className="filter text-sm" data-testid="table-filter">
        <label htmlFor="filter"> Filter by name: </label>
        <input type="text" className="border-[1px] border-slate-400 mb-2 px-2" name="filter" placeholder="First, Last, Preferred"
          onChange={debounce((e) => {
            setFilter(e.target.value);
        }, 500)} />
      </div>
      {!!selected?.length && <button type="button" data-testid="table-delete-btn" className="button bg-red-500 text-white mb-2" onClick={deleteData}>Delete</button>}
      <table>
        <thead>
          <tr>
            { renderTableHeader() }
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
      {renderPagination()}
    </div>
  );
}

export default Table;