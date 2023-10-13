import { fetchAllEquipments } from "../api/routes/equipment";

export class EquipmentService{
    fetchEquipments = () =>{
        return fetchAllEquipments();
    }
}