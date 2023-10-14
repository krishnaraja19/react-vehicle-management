import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import '../styles/VehicleList.css';

export const VehicleList = ({ rows, deleteRow, editRow }) => {
    return (
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Fuel Type</th>
              <th className="expand">Equipments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
            
            if (row && row.id) {
              return (
               
                <tr key={idx} data-testid="vehicle">
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.driver}</td>
                  <td>
                    <span className={`label label-${row.status}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>{row.fuelType}</td>
                  <td className="expand">{row.equipments}</td>
                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(row.id)}
                      />
                      <BsFillPencilFill
                       data-testid="edit-btn"
                        className="edit-btn"
                        onClick={() => editRow(row.id)}
                      />
                    </span>
                  </td>
                </tr>
                
              );
            } else {
              return null; // Skip rendering if 'row' or 'id' is missing
            }
            })}
          </tbody>
        </table>
      </div>
    );
  };