import {BASE_URL_VEHICLES} from "../../common/common.js";
import axios from 'axios';

export async function createVehicle(data){
    try{

        const response = await axios.post(BASE_URL_VEHICLES,{id: data.id, name: data.name, driver:data.driver,
            status:data.status, fuelType:data.fuelType, equipments: data.equipments });
        
        window.location.reload();

        return response;  

    }catch(error){
        console.error("API error:", error);
        throw error; 
    }
                
}

export async function fetchAllVehicle() {
    try {
        const response = await fetch(BASE_URL_VEHICLES);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching vehicle information:', data.error);
            throw new Error('Failed to fetch vehicle information.');
        }
    } catch (error) {
        console.error('Error fetching vehicle information:', error);
        throw error;
    }
}

export async function updateVehicle(data){
    try{

        const response = await axios.put(BASE_URL_VEHICLES+"/"+data.id,{id: data.id, name: data.name, driver:data.driver,
           status:data.status, fuelType:data.fuelType, equipments: data.equipments });
        window.location.reload();
        return response;
    }catch(error){
        console.error("API error",error);
        throw error; 
    }
        
}

export async function deleteVehicle(id){
    try{
        const response =  await axios.delete(BASE_URL_VEHICLES+"/"+id);
        window.location.reload();
        return response;
    }catch(error){
        console.error("API error",error);
        throw error; 
    }
}