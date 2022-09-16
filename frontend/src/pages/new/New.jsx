import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import {
  addPlayer,
  updatePlayer,
  clearCurrent,
} from "../../actions/playerActions";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
const New = ({ inputs, title }) => {
  /* 
  const { state } = useLocation(); */

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [player, setPlayer] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Address: "",
    Group: "",
    BirthDate: new Date(),
  });

  const { current } = useSelector((state) => state.playerReducer);

  useEffect(() => {
    if (current !== null) {
      setPlayer(current);
    } else {
      setPlayer({
        FirstName: "",
        LastName: "",
        Phone: "",
        Address: "",
        Group: "",
        BirthDate: new Date(),
      });
    }
  }, [current]);

  const { FirstName, LastName, Phone, Address, Group, BirthDate } = player;

  const clearAll = () => {
    if (current !== null) {
      dispatch(clearCurrent());
    } else {
      setPlayer({
        FirstName: "",
        LastName: "",
        Phone: "",
        Address: "",
        Group: "",
        BirthDate: new Date(),
      });
    }
  };
  const onChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      FirstName === "" ||
      LastName === "" ||
      Phone === "" ||
      Address === "" ||
      Group === "" ||
      BirthDate === ""
    ) {
      dispatch(setAlert("Please enter all fileds", "danger"));
    } else if (current === null) {
      dispatch(addPlayer(player));
      navigate("/players");
    } else {
      dispatch(updatePlayer(player));
      navigate("/players");
    }
    clearAll();
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={logo} alt="logo" />
          </div>
          <div className="right">
            <form onSubmit={onSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    name={input.label}
                    value={
                      input.label === "FirstName"
                        ? FirstName
                        : input.label === "LastName"
                        ? LastName
                        : input.label === "Group"
                        ? Group
                        : input.label === "BirthDate"
                        ? BirthDate
                        : input.label === "Address"
                        ? Address
                        : input.label === "Phone"
                        ? Phone
                        : null
                    }
                    onChange={onChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
