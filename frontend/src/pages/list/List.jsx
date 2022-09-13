import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import {
  getPlayers,
  deletePlayer,
  clearCurrent,
} from "../../actions/playerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";

const List = () => {
  const { players, loading } = useSelector((state) => state.playerReducer);

  const [data, setData] = useState(players);

  const dispatch = useDispatch();
  const columns = [
    {
      name: "_id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "FirstName",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "LastName",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Group",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "BirthDate",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() => {
                dispatch(deletePlayer(tableMeta.rowData[0]));
                dispatch(clearCurrent());
              }}
            >
              Delete
            </button>
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={() =>
                window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)
              }
            >
              Edit
            </button>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "stacked",
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log("changedColumn: ", changedColumn, "direction: ", direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log("numberOfRows: ", numberOfRows),
    onChangePage: (currentPage) => console.log("currentPage: ", currentPage),
  };

  useEffect(() => {
    dispatch(getPlayers());
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Add New Player
            <Link to="/players/new" className="link">
              Add New
            </Link>
          </div>
          <MUIDataTable
            title={"players List"}
            data={players}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
