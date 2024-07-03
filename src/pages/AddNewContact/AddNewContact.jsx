/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewContact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { addContactToUser } from "../../rtk/chatSlice";
import toast from "react-hot-toast";

const AddNewContact = ({ openModal, modalHandle, user }) => {
  const numberRef = useRef(null);
  const { mainData } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const number = numberRef.current.value.trim();

    if (number.length > 0) {
      const findUser = mainData.find((user) => user.number === number);

      if (number !== user.number) {
        if (findUser) {
          dispatch(addContactToUser({ user, contact: findUser }));
          modalHandle();
          numberRef.current.value = null;
        } else {
          toast.error("un correct number");
        }
      } else {
        toast.error("this is your number.. try another number");
      }
    } else {
      toast.error("enter the number");
    }
  };

  return (
    <div className={openModal ? "AddNewContact open" : "AddNewContact"}>
      <button
        className="AddNewContact__close-btn circleBtn"
        onClick={modalHandle}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>

      <form className="AddNewContact__form main-card" onSubmit={onSubmit}>
        <p className="m-auto">Add New Contact</p>

        <input
          type="number"
          placeholder="Enter contact Number .."
          ref={numberRef}
        />
        <button className="main-btn">Log in</button>
      </form>
    </div>
  );
};

export default AddNewContact;
