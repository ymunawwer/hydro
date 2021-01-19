import React from "react";
import Datatable from "../../common/datatable/Datatable.component";
import Button from "../../common/button/Button";

const TicketStatus = (props: IProps) => {


  let columnsList: any = [];
  columnsList = [
    {
      id: 1,
      Header:  "Tickets",
      accessor: "tickets",
    },
    {
      id: 2,
      Header: "Description",
      accessor: "desc",
    },
    {
      id: 3,
      Header: "REQUEST STATUS",
      accessor: "reqStatus",
    },
    {
      id: 4,
      Header: "LAST UPDATE",
      accessor: "lastUpdate",
    },
  ];

  let listItem = [
    {
      tickets:"#2340",
      desc:"Meter not functional",
      reqStatus:"Pending",
      lastUpdate:"01/01/2020",
    },
    {
      tickets:"#2341",
      desc:"Meter not functional",
      reqStatus:"Resolved",
      lastUpdate:"04/01/2020",
    },
    {
      tickets:"#2342",
      desc:"Meter not functional",
      reqStatus:"Neeed you Reply",
      lastUpdate:"01/01/2020",
    },
    {
      tickets:"#2343",
      desc:"Meter not functional",
      reqStatus:"Pending",
      lastUpdate:"04/01/2020",
    },
  ]
  return (
    <>
    <Datatable
      listItem={listItem}
        //loading={props.loading}
       // listItem={props.transactions}
       // imageSrc={"/assets/images/No-transactions-found.png"}
      //  clickMsg={t("resetFilterMsg")}
       /* buttonComponent={
          <Button className="createBtn">{t("resetFilter")}</Button>
        }*/
        columns={columnsList}
        totalRecords={props.totalRecords}
        filterable={true}
        pageSize={3}
        initialPageSize={3}
        /*onPaginationChange={(page: number, pageSize?: number) => {
          console.log("page:", page, " pageSize:", paeSize);
          pageSize && setState({ ...state, pageSize: pageSize });
          props.onPaginationData(page, pageSize ? pageSize : state.pageSize);
        }}*/
       // module="Transactions"
        //  actionModal={(row: ITransaction) => viewMore(true, row)}
      />
      </>
  )
};

export default TicketStatus;
