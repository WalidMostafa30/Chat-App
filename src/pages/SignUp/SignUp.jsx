import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import AppName from "../../components/AppName/AppName";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../rtk/chatSlice.js";
import toast from "react-hot-toast";

const SignUp = () => {
  const nameRef = useRef(null);
  const numberRef = useRef(null);
  const { mainData } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHAndle = (e) => {
    e.preventDefault();

    const name = nameRef.current.value.trim();
    const number = numberRef.current.value.trim();
    const findUser = mainData.find((user) => user.number === number);
    const userData = {
      name,
      number,
      contacts: [],
    };

    if (name.length > 0 && number.length > 0) {
        if (findUser) {
          toast.error("this number has already been added to the Chat App");
        } else {
          dispatch(addUser(userData));
          navigate(`/home/${number}`);
        }
    } else {
      toast.error("Please enter your name and number");
    }
  };

  return (
    <section className="SignUp text-center mt-5">
      <AppName />

      <form
        className="SignUp__form main-card col-11 col-xl-6"
        onSubmit={submitHAndle}
      >
        <h1 className="SignUp__title mb-2">Create a new account</h1>

        <input placeholder="Enter your Name .." ref={nameRef} maxLength={20} />

        <input
          type="number"
          placeholder="Enter your Number .."
          ref={numberRef}
        />
        <button className="main-btn">Sign-Up</button>

        <Link to={"/login"} className="SignUp__link m-auto">
          already have an acount ?
        </Link>
      </form>
    </section>
  );
};

export default SignUp;
