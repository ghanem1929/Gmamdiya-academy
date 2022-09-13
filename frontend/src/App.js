import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useSelector } from "react-redux";
import SignUp from "./signup/SignUp";
import PrivateRoutes from "./routing/privateRoutes";
import Schedule from "./pages/schedule/Schedule";
import Gallery from "./pages/gallery/Gallery";

function App() {
  const darkMode = useSelector((state) => state.switchMode.isDarkMode);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route index element={<Home />} />
              <Route path="players">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Add New User" />}
                />
              </Route>
              <Route path="schedule">
                <Route index element={<Schedule />} />
              </Route>
              <Route path="gallery">
                <Route index element={<Gallery />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
