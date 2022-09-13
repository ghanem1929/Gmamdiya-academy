import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { switchMode } from "../../actions/action";

const Navbar = () => {
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(switchMode());
  };
  const mode = useSelector((state) => state.switchMode.isDarkMode);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {mode ? (
              <DarkModeOutlinedIcon className="icon" onClick={changeTheme} />
            ) : (
              <WbSunnyOutlinedIcon className="icon" onClick={changeTheme} />
            )}
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          {/* 
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
