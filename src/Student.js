import * as React from 'react';
import  { useCallback, useEffect, useState } from "react";

import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledTooltip,

} from "reactstrap";


const Student = () => {

  const [menuToUpdate, setMenuToUpdate] = useState(null);
  const [allData, setAllData] = useState([]);
  const [menuLabel, setMenuLabel] = useState("");
  const [offsetX, setOffsetX] = useState("");
  const [offsetY, setOffsetY] = useState("");
  const [offsetZ, setOffsetZ] = useState("");
  const [cameraFOV, setCameraFOV] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [selectCamera, setSelectCamera] = useState("");

  const saveDataOneByOne = useCallback(() => {
    axios.post("http://localhost:8080/students/save", { menuLabel , selectCamera, offsetX, offsetY, offsetZ, cameraFOV, menuLink }).then((response, req) => {

      //console.log("response data are=", response);

  setAllData(response.data);

  setMenuLabel('');
  setSelectCamera('');
  setOffsetX('');
  setOffsetY('');
  setOffsetZ('');
  setCameraFOV('');
  setMenuLink('');



    }).catch((err) => { console.log("error are", err) });
    //alert('Save successfully')
  }, [menuLabel, selectCamera, offsetX, offsetY, offsetZ, cameraFOV, menuLink]);

  const cancelSaveData = useCallback(() => {
    axios.get("http://localhost:8080/students/cancel").then((response, req) => {

      console.log("response data are=", response);

      setMenuLabel('');
      setSelectCamera('');
      setOffsetX('');
      setOffsetY('');
      setOffsetZ('');
      setCameraFOV('');
      setMenuLink('');


    }).catch((err) => { console.log("error are", err) });

  }, []);

  useEffect(() => {

    getSaveData();
    //console.log('testing')

  }, [])


  const getSaveData = useCallback(() => {
    axios.get("http://localhost:8080/students/menus", { menuLabel, offsetX, offsetY, offsetZ, cameraFOV, menuLink, selectCamera }).then((response, req) => {


      setAllData(response.data)

    }).catch((err) => { console.log("error are", err) });
  }, [menuLabel, offsetX, offsetY, offsetZ, cameraFOV, menuLink, selectCamera]);





  const editOneByOne = useCallback((menuId) => {
    axios.put(`http://localhost:8080/students/edit/${menuId}`, { menuLabel, offsetX, offsetY, offsetZ, cameraFOV, menuLink, selectCamera }).then((response, req) => {
      setMenuToUpdate(null);
      setAllData(response.data);

    }).catch((err) => { console.log("error are", err) });
  }, [menuLabel, offsetX, offsetY, offsetZ, cameraFOV, menuLink, selectCamera]);




  const editMenu = (menu) => {
    setMenuToUpdate(menu);
    setMenuLabel(menu.menuLabel);
    setOffsetX(menu.offsetX);
    setOffsetY(menu.offsetY);
    setOffsetZ(menu.offsetZ);
    setCameraFOV(menu.cameraFOV);
    setMenuLink(menu.menuLink);
    setSelectCamera(menu.selectCamera)
  }




  const deleteOneByOne = (menuId) => {
    axios.delete(`http://localhost:8080/students/delete/${menuId}`).then((response, req) => {

      setAllData(response.data);
    }).catch((err) => { console.log("error are", err) });
  };

  console.log("all", allData)

  return (
    <>
      {/* menu start here ------------- */}
      <Form>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
          <h2 className="my-5" >Add  Menu</h2>
          <div >
              <div className="form-group w-50 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label"> Menu Label</label>
                <sup className="text-danger">*</sup>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder=" Name"
                  onChange={e => setMenuLabel(e.target.value)} value={menuLabel}
                />
              </div>

            <div className="form-group w-50 mb-3 " onChange={e => setSelectCamera(e.target.value)} value={selectCamera}>
              <label >Camera Name</label>
              <sup className="text-danger">*</sup>
              <select className="form-select form-select-lg " aria-label=".form-select-sm example" >
                <option  >Select Camera</option>
                <option value='Camera1' >Camera1</option>
                <option value='Camera2'>Camera2</option>
                <option value='Camera3'>Camera3</option>
                <option value='Camera4'>Camera4</option>
              </select>
            </div>
            <FormGroup>
              <div className="row g-2 ">
                  <div className="form-group  ">
                    <label >Camera Rotate Offset<sup className="text-danger">*</sup></label>
                </div>
                <div className="col-sm-2">
                    <label className="">X</label>
                    <div className="position-relative form-group">
                      <input
                        name="initialCameraRotateOffsetX"
                        size="15"
                        required=""
                        className="form-control is-untouched"
                        id="initialCameraRotateOffsetX"
                        type="text"
                        onChange={e => setOffsetX(e.target.value)} value={offsetX}
                      />
                    </div>
                </div>
                <div className="col-sm-2">
                  <div className=" form-group">
                    <label className="">Y</label>
                    <div className="position-relative form-group">
                      <input
                        name="initialCameraRotateOffsetY"
                        required=""
                        size="15"
                        className="form-control is-untouched"
                        id="initialCameraRotateOffsetY"
                        type="text"
                        onChange={e => setOffsetY(e.target.value)} value={offsetY}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="help-input ">
                    <label className="">Z</label>
                    <div className="position-relative form-group">
                      <input
                        name="initialCameraRotateOffsetZ"
                        required=""
                        size="15"
                        className="form-control is-untouched"
                        id="initialCameraRotateOffsetZ"
                        type="text"
                        onChange={e => setOffsetZ(e.target.value)} value={offsetZ} />
                    </div>
                  </div>
                </div>
              </div>
            </FormGroup>
            <div className="form-group w-50 mb-3">
              <Label>
                <label className="">Camera FOV</label>
                <sup className="text-danger">*</sup>
              </Label>
              <Input
                type="text"
                name="text-name"
                size="15"
                className="form-control"
                placeholder="name"
                onChange={e => setCameraFOV(e.target.value)} value={cameraFOV}
              />
              <span id="productNameHelp" className="help-text">
                <i className="simple-icon-question"></i>
              </span>
              <UncontrolledTooltip placement="bottom" target="productNameHelp">
                <small>Please enter the product name</small>
              </UncontrolledTooltip>
            </div>
            <div  className="form-group w-50 mb-3">
              <Label>
                <label className="">Menu Link</label>
                <sup className="text-danger">*</sup>
              </Label>
              <Input
                type="text"
                className="form-control"
                placeholder="Link"
                onChange={e => setMenuLink(e.target.value)} value={menuLink}
              />
            </div>
          </div>

                <button className="btn btn-secondary mr-3" type="button"
                        onClick={(e) => {
                          e && e.preventDefault();
                          cancelSaveData();
                        }}>Cancel
                </button>

            {
              menuToUpdate && menuToUpdate._id ? <button className="btn btn-success" type="button"
                onClick={(e) => {
                  e && e.preventDefault();
                  editOneByOne(menuToUpdate._id);
                }}>
                {"Update"}
              </button> :
                  <button type="button" className="btn btn-primary"
                    onClick={(e) => {
                      e && e.preventDefault();
                      saveDataOneByOne();
                    }}>
                    {"Save"}
                  </button>
            }

          <h1 className={"my-5"}>List</h1>
          <table className="table form-label form-group  mb-3" >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Menu Label</th>
                <th scope="col">Selection Camera</th>
                <th scope="col">Offset X</th>
                <th scope="col">Offset Y</th>
                <th scope="col">Offset Z</th>
                <th scope="col">Camera FOV</th>
                <th scope="col">Menu Link</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {
              allData.map((menu, index) => (
                <tbody key={menu._id}>
                  <tr >
                    <th scope="row">{index+1}</th>
                    <td>{menu.menuLabel}</td>
                    <td >{menu.selectCamera}</td>
                    <td >{menu.offsetX}</td>
                    <td >{menu.offsetY}</td>
                    <td >{menu.offsetZ}</td>
                    <td>{menu.cameraFOV}</td>
                    <td >{menu.menuLink}</td>
                    <td>
                      <button
                          type="button" className="btn  mr-2 "
                          onClick={(e) => {
                        e && e.preventDefault();
                        deleteOneByOne(menu._id)
                      }}><i style={{fontSize : "24px"}} className="fa">&#xf014;</i></button>
                      <button
                          type="button" className="btn "
                          onClick={(e) => {
                        e && e.preventDefault();
                        editMenu(menu);
                      }}><i style={{fontSize : "24px"}} className="fa">&#xf044;</i></button>
                    </td>
                  </tr>
                </tbody>
              ))
            }
          </table>
        </div>
          </div>
        </div>

      </Form>


    </>
  )

}
export default Student;



