import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, varenavn: "Vare 1", type: "Type 1", lagerbeholdning: 10 },
    { id: 2, varenavn: "Vare 2", type: "Type 2", lagerbeholdning: 5 },
    { id: 3, varenavn: "Vare 3", type: "Type 3", lagerbeholdning: 8 },
  ]);

  const handleAdd = (id, amount) => {
    if (!amount) return; // Check if amount is empty
    const updatedInventory = inventory.map((item) =>
      item.id === id ? { ...item, lagerbeholdning: item.lagerbeholdning + parseInt(amount) } : item
    );
    setInventory(updatedInventory);
  };

  const handleRemove = (id, amount) => {
    if (!amount) return; // Check if amount is empty
    const updatedInventory = inventory.map((item) =>
      item.id === id && item.lagerbeholdning >= parseInt(amount)
        ? { ...item, lagerbeholdning: item.lagerbeholdning - parseInt(amount) }
        : item
    );
    setInventory(updatedInventory);
  };

  return (
    <div>
      <h1 style={{padding: "10vh"}}>Lager</h1>

      <div className="mb-3 d-flex justify-content-center">
        <div className="me-2">
          <select className="form-select" aria-label="Filter">
            <option value="">Filter</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
        <div>
          <select className="form-select" aria-label="Sort">
            <option value="">Sort</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>
      </div>

      <table className="table" style={{ marginLeft: "10vh", marginRight: "10vh" }}>
        <thead>
          <tr>
            <th scope="col">Varenavn</th>
            <th scope="col">Type</th>
            <th scope="col">Lagerbeholdning</th>
            <th scope="col">Tilføj/Fjern</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.varenavn}</td>
              <td>{item.type}</td>
              <td>{item.lagerbeholdning}</td>
              <td>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min="1"
                    className="form-control me-1"
                    style={{ width: "60px" }}
                    id={`amount-${item.id}`}
                  />
                  <button
                    className="btn btn-sm btn-outline-dark me-1"
                    onClick={() => {
                      const amount = document.getElementById(`amount-${item.id}`).value;
                      if (amount) handleAdd(item.id, amount);
                    }}
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      const amount = document.getElementById(`amount-${item.id}`).value;
                      if (amount) handleRemove(item.id, amount);
                    }}
                  >
                    <FaMinus />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
