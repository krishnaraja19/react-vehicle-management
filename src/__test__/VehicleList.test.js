import { render, screen, waitFor, userEvent, fireEvent } from '@testing-library/react';
import App from '../App';
import axios from 'axios';
jest.mock("axios")

const dummyVehicles = [
    {
        "id": "v1",
        "name": "AB23",
        "driver": "SpongeBob SquarePants",
        "status": "active",
        "fuelType": "LNG",
        "equipments": [
          1,
          2
        ]
      },
      {
        "id": "v2",
        "name": "XXW123",
        "driver": "Patrick Star",
        "status": "active",
        "fuelType": "Diesel",
        "equipments": [
          2
        ]
      },];

const postDummyVehicle = {
    "id": "v3",
    "name": "WWSA",
    "driver": "Mr Fast",
    "status": "active",
    "fuelType": "LNG",
    "equipments": [
      1,
      2
    ]
  };

  const updatedVehicle = {
    id: 'v1', // Replace with the ID of the vehicle you want to update
    name: 'Updated Vehicle Name',
    driver: 'Updated Driver Name',
    status: 'updated', // Updated status
    fuelType: 'LNG',
    equipments: [1, 2], // Updated equipment IDs
  };
  const deleteVehicleId = "v2";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: dummyVehicles });
  });

  describe("VehicleList", () => {
    afterEach(() => {
        jest.clearAllMocks();
      });
    


    it('should get all vehicles', async () => {
      render(<App />);
      const vehicles = await waitFor(() => screen.getAllByTestId('vehicle'));
      expect(vehicles).toHaveLength(2);
    });
  
    it('should add a vehicle', async () => {
      axios.post.mockResolvedValue({ data: postDummyVehicle });
      axios.get.mockResolvedValue({ data: [...dummyVehicles, postDummyVehicle] });
      render(<App />);
      const vehicles = await waitFor(() => screen.getAllByTestId('vehicle'));
      expect(vehicles).toHaveLength(3);
    });
  
    it('should delete a vehicle', async () => {
        axios.delete.mockResolvedValue({ data: deleteVehicleId });
        // Simulate the deletion of the vehicle
        const updatedDummyVehicles = dummyVehicles.filter(vehicle => vehicle.id !== deleteVehicleId);
        axios.get.mockResolvedValue({ data: updatedDummyVehicles });
        render(<App />);
        const vehicles = await waitFor(() => screen.getAllByTestId('vehicle'));
        expect(vehicles).toHaveLength(1);
    });
      
  });
    