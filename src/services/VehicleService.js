import {
    createVehicle,
    fetchAllVehicle,
    updateVehicle,
    deleteVehicle
} from "../api/routes/vehicle";

export class VehicleService{
    fetchVehicles = () =>{
        return fetchAllVehicle();
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