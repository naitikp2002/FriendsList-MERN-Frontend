import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "./Table";

const FormPage = () => {
//   const notify = () => toast("Success");
  const [data,setData]=useState([]);
  const [FriendsInfo, setFriendsInfo] = useState({
    name: "",
    age: 0,
    description: "",
  });

  const handlechange = (e) => {
    setFriendsInfo({ ...FriendsInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(FriendsInfo);
    axios
      .post("http://localhost:3001/addfriend", {
        name: FriendsInfo.name,
        age: FriendsInfo.age,
        description: FriendsInfo.description,
      })
    setFriendsInfo({ name: "", age: 0, description: "" });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/read", {
        name: FriendsInfo.name,
        age: FriendsInfo.age,
        description: FriendsInfo.description,
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch(() => {
        console.log("err")
      });
  }, []);
  return (
    <>
    <div className="container-lg" style={{ minWidth: "50vw" }}>
      <div className="input-group mb-3">
        {/* <ToastContainer /> */}
        <div className="input-group-prepend">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
          >
            Friend's Name
          </button>
        </div>
        <input
          name="name"
          value={FriendsInfo.name}
          type="text"
          className="form-control"
          placeholder
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          onChange={handlechange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="formGroupExampleInput" className="float-left">
          Age
        </label>
        <input
          value={FriendsInfo.age}
          name="age"
          type="number"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Example input placeholder"
          onChange={handlechange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1" className="float-left">
          Add Description
        </label>
        <textarea
          name="description"
          value={FriendsInfo.description}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          onChange={handlechange}
          defaultValue={""}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        class="btn btn-primary float-left mb-2"
      >
        Submit
      </button>
      <div>
      </div>
    </div>
    <div className="container" style={{marginTop:"20px"}}>
    <Table data={data}/>
    </div>
    </>
  );
};

export default FormPage;
