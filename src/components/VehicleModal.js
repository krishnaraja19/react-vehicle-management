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
  const [equipmentError, setEquipmentError] = useState("");

  const validateForm = () => {

    const invalidEquipments = [];
      if (formState.equipments) {
        const enteredEquipments = formState.equipments.split(',').map(equipmentName => equipmentName.trim());
  
        enteredEquipments.forEach(equipmentName => {
          const foundEquipment = equipmentData.find(item => item.name === equipmentName);
          if (!foundEquipment) {
            invalidEquipments.push(equipmentName);
          }
        });
        if (invalidEquipments.length > 0) {
          setEquipmentError(invalidEquipments.join(", "));
          return false;
        } else {
          setEquipmentError(""); // Clear equipment error if all are valid
          
        }
      } else {
        setEquipmentError("");
      }
   

    if (formState.name && formState.driver && formState.status && formState.fuelType) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
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
            <input data-testid="name-input" name="name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="driver">Driver</label>
            <input data-testid="driver-input" name="driver" onChange={handleChange} value={formState.driver} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="">Select Status</option>
              <option  value="active">Active</option>
              <option  value="inactive">Inactive</option>
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
          {equipmentError && <div className="error">{`Not valid Equipment: ${equipmentError}. Please write comma(,) in between equipmets`}</div>}
          <button data-testid="save-button" type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};