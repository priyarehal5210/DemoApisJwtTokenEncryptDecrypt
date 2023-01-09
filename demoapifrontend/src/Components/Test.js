import axios from "axios";
import React, { useEffect, useState, setState } from "react";
import Header from "./Header";
function Test() {
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [checkme, setcheckme] = useState();
  const [id, setid] = useState();
  const [show, setshow] = useState(false);
  const [datafromdb, setdatafromdb] = useState([]);
  const getall = () => {
    axios("https://localhost:7058/api/Test")
      .then((d) => {
        setdatafromdb(d.data);
        // setdata(d);
      })
      .catch((E) => {
        console.log(E);
      });
  };
  const saveform=()=>{
    var dataObj = {
      id,
      name,
      age,
      checkme: false,
    };
    console.log("dataobj is", dataObj);
    setdata([...data, dataObj]);
    setname("");
    setage("");
    setcheckme("");
    setid("");
  }
  function submit(e) {
    e.preventDefault();
  }
  useEffect(() => {
    getall();
  }, []);
  function removeData(e) {
    var index=data.indexOf(e.id);
    console.log(index);
    data.splice(index); 
    console.log(data);  
  }
  const checkbox = (e, id) => {
    var val = e.checkme;
    if (val == false) {
      val = true;
      e.checkme = val;
      setshow(true);
    } else {
      val = false;
      e.checkme = false;
      setshow(false);
    }
  };
  const saveclick = () => {
    //alert("clicked");
    var datais = data;
    console.log(datais);
    var truedata = datais.filter((p) => p.checkme == true);
    console.log(truedata);
    let predata = truedata.filter((p) => p.checkme == true).map((filter) => {
        let obj = {
          id:filter.id,
          name: filter.name,
          age: filter.age,
          checkme: filter.checkme,
        };
        console.log(obj);
        axios
          .post("https://localhost:7058/api/Test", obj)
          .then((d) => {
            getall();
            removeData(obj);
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };
  function renderdata() {
    let rowdata = [];
    data?.map((item) => {
      rowdata.push(
        <tr id="row1">
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>
            <input
              type="checkbox"
              name="checkme"
              id="checkme"
              onClick={() => checkbox(item, item.id)}
            />
          </td>
        </tr>
      );
    });
    return rowdata;
  }
  function renderdataofdb() {
    let rowdatafromdb = [];
    datafromdb?.map((item) => {
      rowdatafromdb.push(
        <tr>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>
            <input checked={item.checkme} type="checkbox" disabled />
          </td>
        </tr>
      );
    });
    return rowdatafromdb;
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
      {/* temp table */}
      <div>
        <h3 id="tblhead">temp table</h3>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>checkme</th>
            </tr>
          </thead>
          <tbody>{renderdata()}</tbody>
        </table>
        {show ? (
          <button
            type="button"
            class="btn btn-primary"
            id="savebtn"
            onClick={saveclick}
          >
            save
          </button>
        ) : null}
      </div>
      {/* main table */}
      <div>
        <h3 id="tblhead">main table</h3>
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>checkme</th>
            </tr>
          </thead>
          <tbody>{renderdataofdb()}</tbody>
        </table>
      </div>

      <form autoComplete="off" onSubmit={submit}>
        <div class="modal" id="savemodal" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content p-2">
              {/* <!-- headestartr  --> */}
              <div class="modal-header">
                <h3 class="modal-title text-capitalize">
                  add data
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
                  <label class="col  textn-capitalize" for="name">
                    id
                  </label>
                  <input
                    type="text"
                    name="id"
                    class="col text-capitalize"
                    id="id"
                    onChange={(e) => setid(e.target.value)}
                    value={id}
                  />
                </div>
                <div class="form-group row">
                  <label class="col  textn-capitalize" for="name">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="col text-capitalize "
                    id="name"
                    onChange={(e) => setname(e.target.value)}
                    value={name}
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
                    onChange={(e) => setage(e.target.value)}
                    value={age}
                  />
                </div>
                <div class="form-group row">
                  <label class="col t textn-capitalize" for="checkme">
                    check
                  </label>
                  <input
                    type="checkbox"
                    name="checkme"
                    class="col text-capitalize"
                    disabled
                    value={checkme}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={saveform}
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
    </div>
  );
}

export default Test;
