import React from "react";
import { useState } from "react";
import '../styles/VehicleModal.css';

export const VehicleModal = ({ closeModal, onSubmit, defaultValue, lengthOfRows, equipmentData }) => {
 
  const [formState, setFormState] = useState(
    defaultValue || {
      id: "v"+parseInt(lengthOfRows+1),
      name: "",
      driver: "",
      status: "",
      fuelType: "",
      equipments: []
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {

    if (formState.name && formState.driver && formState.status && formState.fuelType && typeof formState.equipments !== 'undefined') {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        console.log(value)
        if (!value) {
          errorFields.push(key);
        }
      }
      
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    

     // Replace equipment names with equipment IDs before submitting
    const equipmentIds = [];
    if(formState.equipments.length > 0){
      formState.equipments.split(',').map((equipmentName) => {
        equipmentData.map((item) =>{
            if(item.name === equipmentName.trim())
              equipmentIds.push(item.id);
          });
        });
    }
    
    onSubmit({ ...formState, equipments: equipmentIds });

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="driver">Driver</label>
            <input name="driver" onChange={handleChange} value={formState.driver} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fuelType">Fuel Type</label>
            <input name="fuelType" onChange={handleChange} value={formState.fuelType} />
          </div>
          <div className="form-group">
            <label htmlFor="equipments">Equipments</label>
            <input name="equipments" onChange={handleChange} value={formState.equipments} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};