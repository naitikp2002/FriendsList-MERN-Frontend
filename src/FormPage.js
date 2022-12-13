import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Table from "./Table";

const FormPage = () => {
  //   const notify = () => toast("Success");
  const [data, setData] = useState([]);
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
      .post(
        "https://friendslist.onrender.com/addfriend",
        {
          name: FriendsInfo.name,
          age: FriendsInfo.age,
          description: FriendsInfo.description,
        },
        setFriendsInfo({ name: "", age: 0, description: "" })
      )
      .then((response) => {
        setData([
          ...data,
          {
            _id: response.data._id,
            name: FriendsInfo.name,
            age: FriendsInfo.age,
            description: FriendsInfo.description
          }
        ]);
      });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter New Age: ");
    axios
      .put("https://friendslist.onrender.com/update", { newAge: newAge, id: id })
      .then(() => {
        setData(
          data.map((val) => {
            return val._id === id
              ? {
                  _id: id,
                  name: val.name,
                  age: newAge,
                  description: val.description,
                }
              : val;
          })
        );
      });
  };

  const deleteFriend = (id) => {
    axios.delete(`https://friendslist.onrender.com/delete${id}`).then(() => {
      setData(
        data.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  useEffect(() => {
    axios
      .get("https://friendslist.onrender.com/read", {
        name: FriendsInfo.name,
        age: FriendsInfo.age,
        description: FriendsInfo.description,
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch(() => {
        console.log("err");
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
        <div></div>
      </div>
      <div className="container" style={{ marginTop: "20px" }}>
        {/* <Table data={data} /> */}
        <div>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            {data.map((i) => (
              <tbody class="table-group-divider">
                <tr>
                  <td>{i.name}</td>
                  <td>{i.age}</td>
                  <td>{i.description}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateFriend(i._id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteFriend(i._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default FormPage;
