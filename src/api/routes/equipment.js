import {BASE_URL_EQUIPMENTS} from "../../common/common.js";

export async function fetchAllEquipments() {
    try {
        const response = await fetch(BASE_URL_EQUIPMENTS);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.error('Error fetching equipments information:', data.error);
            throw new Error('Failed to fetch equipments information.');
        }
    } catch (error) {
        console.error('Error fetching equipments information:', error);
        throw error;
    }
}