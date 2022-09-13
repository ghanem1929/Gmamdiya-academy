import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alertActions";
import { addPlayer } from "../../actions/playerActions";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [player, setPlayer] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    Phone: "",
    Address: "",
    Group: "",
    BirthDate: Date,
  });
  const { Email, FirstName, LastName, Phone, Address, Group, BirthDate } =
    player;
  const onChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      Email === "" ||
      FirstName === "" ||
      LastName === "" ||
      Phone === "" ||
      Address === "" ||
      Group === "" ||
      BirthDate === ""
    ) {
      dispatch(setAlert("Please enter all fileds", "danger"));
    } else {
      dispatch(addPlayer(player));
      navigate("/players");
    }
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
