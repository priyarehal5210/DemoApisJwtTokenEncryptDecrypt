import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function SingleDataset() {
 
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
        setdata(d.data);        
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteData=(item)=>{
    if(item.checkme==null || item.checkme==true){
    const dataBeforeDelete=[...data];
    console.log(dataBeforeDelete);
    const index=data.findIndex((p)=>p.id===item.id);
    dataBeforeDelete.splice(index,1);
    console.log(dataBeforeDelete);
    setdata(dataBeforeDelete);
    console.log(dataBeforeDelete);
    }
    else{
   var res =window.confirm("want to delete?");
    if (res) {
      axios.delete("https://localhost:7058/api/SingleDataset/" + item.id).then(() => {      
      getDataFromDb();
      });
    } else {
      getDataFromDb();
    }
    }
 
  }
  const saveToDb = () => {    
    const datais=[...data];
    let predata = datais.filter((p) => p.checkme == true).map((item) => {
        let obj = {
          name: item.name,
          age: item.age,
          checkme: item.checkme
        };
        axios
        .post("https://localhost:7058/api/SingleDataset", obj)
        .then(() => { 
          addingTrueValue();
        })
        .catch((e) => {
          console.log(e);
        });    
      });    
  };
  function addingTrueValue(){
    setdata(data.map(item=>{
      if(item.checkme==true){
        let obj={
          name:item.name,
          age:item.age,
        }
        console.log(obj);
        return {...item,checkme:false};
      }else{
        return item;
      }
    }))
    // const allData=[...data];
    // const newvalue=allData.find(item=>item.checkme==true);
    // console.log(newvalue);
    // newvalue.checkme=false;
    // console.log(newvalue);
    // setdata(newvalue);
  }
  const updateInDb=()=>{
    if(editForm.checkme==null){
      console.log("state vala");
      let editableData = {
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
 else{
 axios.put("https://localhost:7058/api/SingleDataset",editForm)
    .then(()=>{
      getDataFromDb();
    }).catch((e)=>{
      console.log(e);
    })
    console.log("database vala")
 }    
   
  }
  const clear=()=>{
    setname("");
    setage("");
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
    clear();
  };
  const editData=(e)=>{
    setEditForm(e);
  }
  const changeHandler=(e)=>{
    setEditForm({...editForm,[e.target.name]:e.target.value})
  }
  const checkbox = (e) => {
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
                onClick={() => deleteData(item)}
              >
                Delete
              </button>
              <button
                data-toggle="modal"
                data-target="#editModal"
                className="btn btn-danger"
                onClick={() => editData(item)}
              >
                edit
              </button>
            </td>
          ) : <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteData(item)}
          >
            remove
          </button>
          <button
           data-toggle="modal"
           data-target="#editModal"
           className="btn btn-danger"
           onClick={() => editData(item)}
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
                {/* <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={updateState} 
                >
                  updatestate
                </button>    */}
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
