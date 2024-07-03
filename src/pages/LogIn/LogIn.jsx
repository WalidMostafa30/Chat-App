import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import AppName from "../../components/AppName/AppName";
import { useRef } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const LogIn = () => {
  const { mainData } = useSelector((state) => state.chat);

  const numberRef = useRef(null);

  const navigate = useNavigate();

  const submitHAndle = (e) => {
    e.preventDefault();
    const number = numberRef.current.value.trim();
    const findUser = mainData.find((user) => user.number === number);
    if (number.length > 0) {
      if (findUser) {
        navigate(`/home/${number}`);
      } else {
        toast.error("this number not found");
      }
    } else {
      toast.error("enter the number");
    }
  };

  return (
    <section className="LogIn text-center mt-5">
      <AppName />

      <form
        className="LogIn__form main-card col-11 col-xl-6"
        onSubmit={submitHAndle}
      >
        <h1 className="LogIn__title mb-2">Log in to Chat App</h1>

        <input
          type="number"
          placeholder="Enter your Number .."
          ref={numberRef}
        />
        <button className="main-btn">Log in</button>

        <Link to={"/signup"} className="LogIn__link m-auto">
          create an acount
        </Link>
      </form>
    </section>
  );
};

export default LogIn;
