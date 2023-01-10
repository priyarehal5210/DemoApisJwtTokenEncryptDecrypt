import axios from "axios";
import { cleanData, removeData } from "jquery";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function SingleDataset() {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [show, setshow] = useState(false);
  const [checkme, setcheckme] = useState();
  const[edit,setedit]=useState([]);
  const getall = () => {
    axios
      .get("https://localhost:7058/api/SingleDataset")
      .then((d) => {
        setdata(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const saveclick = () => {
    var dataObj = {
      name,
      age,
      checkme,
    };
    console.log("user info is", dataObj);
    setdata([...data, dataObj]);
  };
  const checkbox = (e) => {
    debugger;
    var val = e.checkme;
    if (val == false) {
      val = false;
      e.checkme = false;
      setshow(false);
    } else {
      val = true;
      e.checkme = val;
      setshow(true);
    }
  };
  const savetoform = () => {
    debugger;
    var datais = data;
    var truedata = datais.filter((p) => p.checkme == true);
    let predata = truedata
      .filter((p) => p.checkme == true)
      .map((filter) => {
        let obj = {
          name: filter.name,
          age: filter.age,
          checkme: filter.checkme,
        };
        axios
          .post("https://localhost:7058/api/SingleDataset", obj)
          .then((d) => {
           getall();
          })
          .catch((e) => {
            console.log(e);
          });
          console.log(datais);
      });
  };
  const changehandler=(e)=>{
    console.log(e);
    setedit({...edit,[e.target.name]:e.target.value})
  }
  const editClick=(e)=>{    
    console.log(e);
    setedit(e);
  }
  const updateclick=()=>{
    axios.put("https://localhost:7058/api/SingleDataset",edit)
    .then(()=>{
        getall();
    }).catch((e)=>{
        console.log(e);
    })
  }
  const deleteClick=(id)=>{
    var res =window.confirm("want to delete?");
    if (res) {
      axios.delete("https://localhost:7058/api/SingleDataset/" + id).then(() => {
        getall();
      });
    } else {
      getall();
    }
  }
  useEffect(() => {
    getall();
  }, []);
  function submit(e) {
    e.preventDefault();
  }
  function renderdataofdb() {
    let rowdata = [];
    data?.map((item) => {
      rowdata.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.age}</td>
          {item.checkme == false ? (
            <td>
              <input type="checkbox" disabled checked />
            </td>
          ) : (
            <td>
              <input type="checkbox" onClick={() => checkbox(item)} />
            </td>
          )}
          {item.checkme == false ? (
            <td>
              <button
                className="btn btn-info"
                data-toggle="modal"
                data-target="#editModal"
                onClick={() => editClick(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteClick(item.id)}
              >
                Delete
              </button>
            </td>
          ) : null}
        </tr>
      );
    });
    return rowdata;
  }
  return (
    <div>
      <Header />
      <div className="text-center row mt-4 div">
        <h1 className="text-capitalize  head">data list</h1>
        <button
          data-toggle="modal"
          data-target="#savemodal"
          className="text-capitalize addbtn col-3 btns"
        >
          add data
        </button>
      </div>

      {/* main table */}
      <div>
        <h3 id="tblhead">main table</h3>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>check</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderdataofdb()}</tbody>
        </table>
        {show ? (
          <button
            type="button"
            class="btn btn-primary"
            id="savebtn"
            onClick={savetoform}
          >
            save
          </button>
        ) : null}
      </div>

      <form autoComplete="off" onSubmit={submit}>
        <div class="modal" id="savemodal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content p-2">
              {/* <!-- headestartr  --> */}
              <div class="modal-header">
                <h3 class="modal-title text-capitalize">add data</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- body start --> */}
              <div class="modal-body border-0 p-2">
                {/* <div class="form-group row">
                  <label class="col  textn-capitalize" for="name">
                    id
                  </label>
                  <input
                    type="text"
                    name="id"
                    class="col text-capitalize"
                    id="id"
                  />
                </div> */}
               
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="name">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="col text-capitalize "
                    id="name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="age">
                    age
                  </label>
                  <input
                    type="tel"
                    name="age"
                    class="col text-capitalize "
                    id="age"
                    onChange={(e) => {
                      setage(e.target.value);
                    }}
                  />
                </div>
            
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={saveclick}
                >
                  save
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <form autoComplete="off" onSubmit={submit}>
        <div class="modal" id="editModal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content p-2">
              {/* <!-- headestartr  --> */}
              <div class="modal-header">
                <h3 class="modal-title text-capitalize">edit data</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- body start --> */}
              <div class="modal-body border-0 p-2">
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="name">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="col text-capitalize "
                    id="name"
                    onChange={changehandler}
                    value={edit.name}
                  />
                </div>
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="age">
                    age
                  </label>
                  <input
                    type="tel"
                    name="age"
                    class="col text-capitalize "
                    id="age"
                    onChange={changehandler}
                    value={edit.age}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={updateclick}
                >
                  udpate
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SingleDataset;
