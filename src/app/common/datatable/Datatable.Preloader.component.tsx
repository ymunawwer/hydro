import React, { useState } from "react";
import ReactTable from "react-table";
import Pagination from "./Pagination.component";
import "react-table/react-table.css";
import "./Pagination.scss";

export interface IProps {
  columns: any;
}

export const TableDataLoader = (row: any) => {
  return <div className="tableDataLoader"></div>;
};

const PreLoaderDataTable = (props: IProps) => {
  const listItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
    return {};
  });
  const { columns } = props;
  const dataTableState = {
    filtered: [],
    pageSize: 10,
    totalRecords: 11,
    activePage: 1,
    columnsInitialCount: columns.length,
  };
  const [state, setState] = useState(dataTableState as any);

  let totalPages =
    state.totalRecords && state.pageSize && state.totalRecords / state.pageSize;
  totalPages && totalPages % 1 !== 0 && (totalPages = Math.ceil(totalPages));

  return (
    <ReactTable
      getTrProps={({}, rowInfo: any) => {
        return {
          className:
            rowInfo &&
            rowInfo.original &&
            rowInfo.original.isActive === false &&
            "activeClick",
        };
      }}
      getTheadThProps={() => {
        return {
          className: "tableHeader",
        };
      }}
      PaginationComponent={Pagination}
      data={listItem}
      filterable={true}
      columns={columns.map((item) => ({ ...item, Cell: <TableDataLoader /> }))}
      defaultPageSize={state.pageSize}
      pageSize={
        listItem.length < state.pageSize ? listItem.length : state.pageSize
      }
      pages={totalPages}
      className="-striped -highlight"
    />
  );
};

export default PreLoaderDataTable;
