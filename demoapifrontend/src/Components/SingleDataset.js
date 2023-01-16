import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function SingleDataset() {
  function getDataFromLocalStorage(){
    const datais=localStorage.getItem('falseData');
    if(datais){
      return JSON.parse(datais);
    }
    else{
    return [];
    }
  }
  // console.log(getDataFromLocalStorage())
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [age, setage] = useState();
  const [show, setshow] = useState(false);
  const[falsedata,setfalsedata]=useState([]);
  const [editForm,setEditForm]=useState([]);
  useEffect(() => {
    getDataFromDb();
  }, []);
  //DATABASE OPERATIONS
  const getDataFromDb = () => {
    axios
      .get("https://localhost:7058/api/SingleDataset")
      .then((d) => { 
        const comingdata=[d.data];
        const datafromlocalstorage=getDataFromLocalStorage();
        console.log(datafromlocalstorage);
        setdata(...comingdata);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(()=>{
    localStorage.setItem('falseData',JSON.stringify(falsedata));
  },[falsedata])
  const editStoredData=(e)=>{
    setEditForm(e);
  }
  const deleteDataFromDb=(id)=>{
    var res =window.confirm("want to delete?");
    if (res) {
      axios.delete("https://localhost:7058/api/SingleDataset/" + id).then(() => {      
      getDataFromDb();
      });
    } else {
      getDataFromDb();
    }
  }
  const saveToDb = () => {    
    debugger;
    // const datais =data;
    const datais=data;
    setdata(datais);
    let predata = datais.filter((p) => p.checkme == true).map((item) => {
        let obj = {
          name: item.name,
          age: item.age,
          checkme: item.checkme,
        };
        axios
        .post("https://localhost:7058/api/SingleDataset", obj)
        .then(() => {   
          debugger;
          const allData=[...data];
          console.log(allData);
          const falsedatais=allData.filter((p)=>p.checkme==null);
          console.log(falsedatais);
          setfalsedata(falsedatais);
          getDataFromDb();
        })
        .catch((e) => {
          console.log(e);
        });    
      });    
  };
  const updateInDb=()=>{
    axios.put("https://localhost:7058/api/SingleDataset",editForm)
    .then(()=>{
      getDataFromDb();
    }).catch((e)=>{
      console.log(e);
    })
  }
  //STATES OPERATIONS
  const saveToTable = () => {
    var dataObj = {
      id:nanoid(),
      name,
      age,
      checkme:null
    };
    setdata([...data, dataObj]);
    setname("");
    setage();
  };
  const editDataInState=(e)=>{
    setEditForm(e);
  }
  const updateState=()=>{
    var editableData = {
      id:editForm.id,
      name:editForm.name,
      age:editForm.age,
    };
    console.log(editableData);
    const dataBeforeEdit=[...data];
    console.log(dataBeforeEdit);
    const index=data.findIndex((item)=>item.id===editForm.id);
    console.log(index);
    dataBeforeEdit[index]=editableData;
    setdata(dataBeforeEdit);
    console.log(dataBeforeEdit);
  }
  const removeDataFromState=(id)=>{
    const dataBeforeDelete=[...data];
    console.log(dataBeforeDelete);
    const index=data.findIndex((item)=>item.id===id);
    dataBeforeDelete.splice(index,1);
    console.log(dataBeforeDelete);
    setdata(dataBeforeDelete);
    console.log(dataBeforeDelete);
  }
  //CHANGEHANDLERS
  const changeHandler=(e)=>{
    setEditForm({...editForm,[e.target.name]:e.target.value})
  }
  const checkbox = (e) => {
    debugger;
    var val = e.checkme;
    if (val == false) {
      setshow(false);
    } else {
      e.checkme = true;
      setshow(true);
    }
  };
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
          {item.checkme == true || item.checkme==null? (
               <td>
               <input type="checkbox" onClick={() => checkbox(item)} />
               </td>
          ) : (
            <td>
            <input type="checkbox" disabled checked />
          </td>
          )}
          {item.checkme == false ? (
            <td>           
              <button
                className="btn btn-danger"
                onClick={() => deleteDataFromDb(item.id)}
              >
                Delete
              </button>
              <button
                data-toggle="modal"
                data-target="#editModal"
                className="btn btn-danger"
                onClick={() => editStoredData(item)}
              >
                edit
              </button>
            </td>
          ) : <td>
          <button
            className="btn btn-danger"
            onClick={() => removeDataFromState(item.id)}
          >
            remove
          </button>
          <button
           data-toggle="modal"
           data-target="#editModal"
           className="btn btn-danger"
           onClick={() => editDataInState(item)}
          >
            edit state
          </button>
        </td>}
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
          <tbody>{renderdataofdb()}
          </tbody>
        </table>
        {show ? (
          <button
            type="button"
            class="btn btn-primary"
            id="savebtn"
            onClick={saveToDb}
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
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="checkbox">
                    checkme
                  </label>
                  <input
                  disabled
                    type="checkbox"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={saveToTable}
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
                    value={editForm.name}
                  />
                </div>
                
                <div class="form-group row">
                  <label class="col text-center textn-capitalize" for="age">
                    age
                  </label>
                  <input
                    type="tel"
                    name="age"
                    class="col text-capitalize border-0"
                    id="age"
                    onChange={changeHandler}
                    value={editForm.age}
                  />
                </div>
            
              </div>
              <div class="modal-footer">
              <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={updateInDb} 
                >
                  update
                </button>              
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={updateState} 
                >
                  updatestate
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
