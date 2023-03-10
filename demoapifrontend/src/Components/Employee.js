import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
function Employee() {
  const [dep, setdep] = useState([]);
  const [Employee, setemployee] = useState([]);
  const [empform, setempform] = useState([]);
  var token=localStorage.getItem("Token");
  var Authorization=`Bearer ${token}`;
  //calling employee display api
  const getall = () => {
   // let token=localStorage.getItem('token');
    axios
      .get("https://localhost:7058/api/Employee",{headers:{Authorization:Authorization}})
      .then((e) => {
        //console.log(e.data);
        setemployee(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //calling department display api
  const getalldep = () => {
    axios
      .get("https://localhost:7058/api/Employee/Departments",{headers:{Authorization:Authorization}})
      .then((e) => {
        setdep(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //calling save api
  const saveclick = () => {
    // let token=localStorage.getItem('token');
    axios
      .post("https://localhost:7058/api/Employee", empform,{headers:{Authorization:Authorization}})
      .then((d) => {
        //console.log(d.data.departmentId);
        //console.log(d.data);
        if(d.data.departmentId==null){
          d.data.departmentId=1;
        }
        getall();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //calling delete api
  const deleteClick = (id) => {
    var res =window.confirm("want to delete?");
    if (res) {
      axios.delete("https://localhost:7058/api/Employee/" + id,{headers:{Authorization:Authorization}}).then(() => {
        getall();
      });
    } else {
      getall();
    }
  };
  //onchange on checkbox
  const changeHandlercheckbox = (e) => {
    console.log(e.target.checked);
    setempform({ ...empform, [e.target.name]: e.target.checked });
  };
  //onchange on inputs
  const changeHandler = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setempform({ ...empform, [e.target.name]: e.target.value });
    console.log(empform);
  };
  //edit button
  const editClick = (e) => {
    console.log(e);
    setempform(e);
  };
  useEffect(()=>{
    //console.log(empform);
  },[empform])
  //calling update api
  const updateclick = () => {
    axios
      .put("https://localhost:7058/api/Employee", empform,{headers:{Authorization:Authorization}})
      .then(() => {
        getall();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //using useeffect to call display apis 
  useEffect(() => {
    getall();
    getalldep();
  },[]);
  //tbody
  function renderemp() {
    let rowdata = [];
    Employee?.map((item) => {
      rowdata.push(
        // console.log(item)
        <tr>
          <td>{item.name}</td>
          <td>{item.dep.name}</td>
          <td>
            <input type="checkbox"
             disabled checked={item.isOkay}/>
          </td>
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
        </tr>
      );
    });
    return rowdata;
  }
 
  return (
    <div>
      <Header/>
      <div className="text-center row mt-4 div">
        <h1 className="text-capitalize  head">Employee list</h1>
        <button
          data-toggle="modal"
          data-target="#savemodal"
          className="text-capitalize addbtn col-3 btns"
        >
          add Employee
        </button>
      </div>
      <div>
        <table class="table table-stripped mt-5">
          <thead>
            <tr>
              <th>name</th>
              <th>department</th>
              <th>IsOkay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderemp()}</tbody>
        </table>
      </div>
      {/* save form */}
      <form>
        <div class="modal" id="savemodal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content p-2">
              {/* <!-- headestartr  --> */}
              <div class="modal-header">
                <h3 class="modal-title text-capitalize text-primary">
                  add Employee
                </h3>
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
                  <label class="col text-center textn-capitalize" for="name">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="col text-capitalize border-0"
                    id="name"
                    onChange={changeHandler}
                  />
                </div>
                <div class="form-group row">
                  <label class="col text-center text-capitalize">
                    department
                  </label>
                  <select
                    class="col text-center text-capitalize"
                    onChange={changeHandler}
                    name="departmentId"
                  >
                    {dep
                      ? dep.map((item) => {
                          return (
                            <option id={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div class="form-group row">
                  <label class="col text-center textn-capitalize" for="isOkay">
                    isokay
                  </label>
                  <input
                    type="checkbox"
                    name="isOkay"
                    class="col text-capitalize border-0"
                    onChange={changeHandlercheckbox}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
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
      {/* udpate form */}
      <form>
        <div class="modal" id="editModal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content p-2">
              {/* <!-- headestartr  --> */}
              <div class="modal-header">
                <h3 class="modal-title text-capitalize text-primary">
                  edit Employee
                </h3>
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
                  <label class="col text-center textn-capitalize" for="name">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="col text-capitalize border-0"
                    id="name"
                    onChange={changeHandler}
                    value={empform.name}
                  />
                </div>
                
                <div class="form-group row">
                  <label class="col text-center textn-capitalize" for="isOkay">
                    isokay
                  </label>
                  <input
                    type="checkbox"
                    name="isOkay"
                    class="col text-capitalize border-0"
                    id="isOkay"
                    onChange={changeHandlercheckbox}
                    checked={empform.isOkay}
                  />
                </div>
                <div class="form-group row">
                  <label class="col text-center text-capitalize">
                    department
                  </label>
                  <select
                    class="col text-center text-capitalize"
                    onChange={changeHandler}
                    name="departmentId"
                    id="departmentId"
                    value={ empform && empform.departmentId ? empform.departmentId :  empform.dep && empform.dep.id ? empform.dep.id :"" }
                  >
                    {dep
                      ? dep.map((item) => {
                          return (
                            <option  id={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={updateclick}
                >
                  update
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

export default Employee;
