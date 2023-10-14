import {BASE_URL_VEHICLES} from "../../common/common.js";
import axios from 'axios';

export async function createVehicle(data){
    try{

        const response = await axios.post(BASE_URL_VEHICLES,{id: data.id, name: data.name, driver:data.driver,
            status:data.status, fuelType:data.fuelType, equipments: data.equipments });
        
        window.location.reload();

        return response;  

    }catch(error){
        alert("API error:", error);
    }
                
}

export async function getAllVehicles() {
    try {
        const response = await axios.get(BASE_URL_VEHICLES);
        return response.data;
       
    } catch (error) {
        console.log(error)
        alert('Error fetching vehicle information:', error);
    }
}

export async function updateVehicle(data){
    try{

        const response = await axios.put(BASE_URL_VEHICLES+"/"+data.id,{id: data.id, name: data.name, driver:data.driver,
           status:data.status, fuelType:data.fuelType, equipments: data.equipments });
        window.location.reload();
        return response;
    }catch(error){
        alert("API error",error);
    }
        
}

export async function deleteVehicle(id){
    try{
        const response =  await axios.delete(BASE_URL_VEHICLES+"/"+id);
        window.location.reload();
        return response;
    }catch(error){
        alert("API error",error);
    }
}