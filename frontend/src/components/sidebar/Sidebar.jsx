import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { darkMode, lightMode } from "../../actions/action";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../actions/types";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Gmamdia Academy</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">SECTIONS</p>
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Schedule</span>
            </li>
          </Link>
          <Link to="/players" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Players</span>
            </li>
          </Link>
          <Link to="/gallery" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsSharpIcon className="icon" />
              <span>Gallery</span>
            </li>
          </Link>
          <Link to="/kit" style={{ textDecoration: "none" }}>
            <li>
              <SportsSoccerIcon className="icon" />
              <span>kit</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li onClick={() => dispatch({ type: LOGOUT })}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch(lightMode())}
        ></div>
        <div className="colorOption" onClick={() => dispatch(darkMode())}></div>
      </div>
    </div>
  );
};

export default Sidebar;
