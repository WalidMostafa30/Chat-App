import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../../rtk/ChatSlice";
import "./EditContact.css";
import { useSelector } from "react-redux";

const EditContact = ({ openModal, modalHandle }) => {
  const { chatState, chatNum } = useSelector((state) => state.Chat);

  const [Name, setName] = useState(chatState[chatNum].name);
  const [Number, setNumber] = useState(chatState[chatNum].number);
  const [Image, setImage] = useState("");

  const dispatch = useDispatch();

  const inputImg = useRef();

  const onchangeName = (e) => {
    setName(e.target.value);
  };

  const onchangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const onchangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const contactAfterEdit = {
      name: Name,
      number: Number,
      image: Image ? URL.createObjectURL(Image) : chatState[chatNum].image,
    };

    dispatch(editContact(contactAfterEdit));
    setName("");
    setNumber("");
    setImage("");
    modalHandle();
  };
  return (
    <div className={openModal ? "EditContact open" : "EditContact"}>
      <button className="EditContact__close-btn" onClick={modalHandle}>
        X
      </button>

      <form className="EditContact__form" onSubmit={onSubmit}>
        <div
          className="EditContact__form-input"
          onClick={() => inputImg.current.click()}
          style={{ cursor: "pointer", marginBottom: "10px" }}
        >
          {Image ? (
            <img src={URL.createObjectURL(Image)} alt="img" />
          ) : (
            <img src={chatState[chatNum].image} alt="img" />
          )}
          <h4 htmlFor="Photo">Photo</h4>

          <input
            type="file"
            id="Photo"
            ref={inputImg}
            style={{ display: "none" }}
            onChange={onchangeImage}
          />
        </div>

        <div className="EditContact__form-input">
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            placeholder="Name.."
            onChange={onchangeName}
            value={Name}
            required
          />
        </div>

        <div className="EditContact__form-input">
          <label htmlFor="Number">Number</label>
          <input
            id="Number"
            placeholder="Number.."
            onChange={onchangeNumber}
            value={Number}
            required
          />
        </div>

        <button className="EditContact__form-btn">Add</button>
      </form>
    </div>
  );
};

export default EditContact;
