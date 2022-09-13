import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlayers } from "../../actions/playerActions";

const List = () => {
  const { players } = useSelector((state) => state.playerReducer);
  const dispatch = useDispatch();
  var data = players.slice(0, 3);
  useEffect(() => {
    dispatch(getPlayers());
    console.log(players.length);
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">FirstName</TableCell>
            <TableCell className="tableCell">LastName</TableCell>
            <TableCell className="tableCell">Group</TableCell>
            <TableCell className="tableCell">Coach</TableCell>
            <TableCell className="tableCell">BirthDate</TableCell>
            {/* 
            <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {/* 
                  <img src={row.img} alt="" className="image" /> */}
                  {row.FirstName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.LastName}</TableCell>
              <TableCell className="tableCell">{row.Group}</TableCell>
              <TableCell className="tableCell">{row.coatch}</TableCell>
              <TableCell className="tableCell">
                {row.BirthDate.slice(0, 10)}
              </TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
