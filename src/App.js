import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";
import SocketContextProvider from "./context/SocketContext";

function App() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  return (
    <div className="dark">
      <SocketContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </SocketContextProvider>
    </div>
  );
}

export default App;
