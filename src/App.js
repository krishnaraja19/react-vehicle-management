import { useState,useEffect } from "react";
import "./App.css";
import { VehicleList } from "./components/VehicleList";
import { VehicleModal } from "./components/VehicleModal";
import { VehicleService } from "./services/VehicleService";
import { EquipmentService } from "./services/EquipmentService";

export const vehicleService = new VehicleService();
export const equipmentService = new EquipmentService();

function App() {
  const [data, setData] =useState([]);
  const [equipmentData,setEquipmentData] =useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);



  const getAllEquipments = async () => {
    try {
      const equipmentData = await equipmentService.fetchEquipments();
      
      setEquipmentData(equipmentData);
      return equipmentData;

    } catch (error) {
      console.error('Error fetching equipment information:', error);
    }
    }
  useEffect(() => {
    // Fetch the JSON data from a file
    getVehicleData();
  },[]);

  const getVehicleData = async () => {
    var equipmentData = await getAllEquipments();  
    const data = await vehicleService.getVehicles();
    // Map equipment IDs to their names in each vehicle
    const vehiclesWithEquipmentNames = data.map((vehicle) => {
      if (Array.isArray(vehicle.equipments)) {
        const equipmentNames = vehicle.equipments.map((equipmentId) => {
          const equipment = equipmentData.find((item) => item.id === equipmentId);
          return equipment ? equipment.name : `Equipment ${equipmentId}`;
        });
        return { ...vehicle, equipments: equipmentNames.join(', ') };
      }
      return vehicle;
    });
    setData(vehiclesWithEquipmentNames);
  }
 

  const handleDeleteRow = (targetIndex) => {
    vehicleService.deleteVehicle(targetIndex);
  };

  const handleEditRow = (idx) => {
    data.map((editRow,index)=>{
      if(editRow.id === idx){
        setRowToEdit(editRow);
      }
       });
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    console.log(newRow)
    rowToEdit === null
      ? vehicleService.saveVehicle(newRow)
      : vehicleService.updateVehicle(newRow);
  };

  return (
    <div className="App">
      <div className="MyApp"><h1>Vehicle Management</h1></div>
     
      <div className="buttonDiv">
        <button onClick={() => setModalOpen(true)} className="btn">
          Add Vehicle
        </button>
      </div>
      {modalOpen && (
        <VehicleModal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit}
          lengthOfRows= {data.length}
          equipmentData={equipmentData}
        />
      )}
       <VehicleList rows={data} deleteRow={handleDeleteRow} editRow={handleEditRow} />
    </div>
  );
}

export default App;