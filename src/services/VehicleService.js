import {
    createVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle
} from "../api/routes/vehicle";

export class VehicleService{
    getVehicles = () =>{
        return getAllVehicles();
    }

    saveVehicle = (data) =>{
        return createVehicle(data);
    }

    updateVehicle = (data) =>{
        return updateVehicle(data);
    }

    deleteVehicle = (data) =>{
        return deleteVehicle(data);
    }
}