import "./Main.css";
import { Link } from "react-router-dom";
import AppName from "../../components/AppName/AppName";

const Main = () => {
  return (
    <main className="Main  text-center mt-5">
      <h5 className="Main__title">Welcome to</h5>
      <AppName />

      <div className="Main__login-box main-card col-11 col-xl-6">
        create an account
        <Link className="main-btn" to={"/signup"}>
          Sign-Up
        </Link>
        already have an account
        <Link className="main-btn" to={"/login"}>
          Log-In
        </Link>
      </div>
    </main>
  );
};

export default Main;
