import React, { useState } from "react";
import { FaCheck, FaSort, FaSortDown, FaSortUp, FaTimes } from "react-icons/fa";

interface Order {
  ordrenummer: number;
  kundenummer: number;
  afsendt: boolean;
  products: Product[];
}

interface Product {
  name: string;
  quantity: number;
  price: number;
}

function Orders() {
  // Dummy data for customers
  const customers = [
    { kundenummer: 54321, fornavn: "John", efternavn: "Doe", email: "john@example.com" },
    { kundenummer: 98765, fornavn: "Jane", efternavn: "Doe", email: "jane@example.com" },
    { kundenummer: 86420, fornavn: "Alice", efternavn: "Smith", email: "alice@example.com" },
    { kundenummer: 97531, fornavn: "Bob", efternavn: "Johnson", email: "bob@example.com" },
  ];

  // Dummy data for products
  const products = [
    {
      name: "ANABELLE",
      price: 450,
      quantity: 2,
    },
    {
      name: "MATILDA",
      price: 700,
      quantity: 1,
    },
    {
      name: "MARTHA",
      price: 275,
      quantity: 3,
    },
  ];

  // Dummy data for orders
  const [orders, setOrders] = useState<Order[]>([
    { ordrenummer: 12345, kundenummer: 54321, afsendt: true, products },
    { ordrenummer: 67890, kundenummer: 98765, afsendt: false, products },
    { ordrenummer: 24680, kundenummer: 86420, afsendt: true, products },
    { ordrenummer: 13579, kundenummer: 97531, afsendt: false, products },
  ]);

  // Filtered orders based on search criteria
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Sort configurations for each column
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: string }>({
    key: "ordrenummer",
    direction: "ascending",
  });

  const requestSort = (key: keyof Order) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: keyof Order) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm.toLowerCase());
    const filtered = orders.filter(
      (order) =>
        order.ordrenummer.toString().includes(searchTerm) || order.kundenummer.toString().includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  const sortedOrders = filteredOrders.length > 0 ? filteredOrders : orders;

  // Sort the filtered orders
  sortedOrders.sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
    } else {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
    }
  });

  const [modalData, setModalData] = useState<Order | null>(null);

  const openModal = (order: Order) => {
    setModalData(order);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div>
      <h1 style={{ padding: "10vh" }}>Ordrer</h1>
      <div className="input-group mb-3" style={{ marginLeft: "10vh", marginRight: "10vh", maxWidth: "90vw" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Søg efter ordrenummer eller kundenummer"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">
          Søg
        </button>
      </div>
      <table className="table" style={{ marginLeft: "10vh", marginRight: "10vh", maxWidth: "90vw" }}>
        <thead>
          <tr>
            <th onClick={() => requestSort("ordrenummer")} className={getClassNamesFor("ordrenummer")}>
              Ordrenummer
              <div className="d-inline">
                {sortConfig.key === "ordrenummer" && sortConfig.direction === "ascending" && <FaSortUp />}
                {sortConfig.key === "ordrenummer" && sortConfig.direction === "descending" && (
                  <FaSortDown />
                )}
                {sortConfig.key !== "ordrenummer" && <FaSort />}
              </div>
            </th>
            <th onClick={() => requestSort("kundenummer")} className={getClassNamesFor("kundenummer")}>
              Kundenummer
              <div className="d-inline">
                {sortConfig.key === "kundenummer" && sortConfig.direction === "ascending" && <FaSortUp />}
                {sortConfig.key === "kundenummer" && sortConfig.direction === "descending" && (
                  <FaSortDown />
                )}
                {sortConfig.key !== "kundenummer" && <FaSort />}
              </div>
            </th>
            <th onClick={() => requestSort("afsendt")} className={getClassNamesFor("afsendt")}>
              Afsendt fra lager
              <div className="d-inline">
                {sortConfig.key === "afsendt" && sortConfig.direction === "ascending" && <FaSortUp />}
                {sortConfig.key === "afsendt" && sortConfig.direction === "descending" && <FaSortDown />}
                {sortConfig.key !== "afsendt" && <FaSort />}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order, index) => (
            <tr key={index}>
              <td onClick={() => openModal(order)}>{order.ordrenummer}</td>
              <td>{order.kundenummer}</td>
              <td>{order.afsendt ? <FaCheck /> : <FaTimes />}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalData && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ordrenummer: {modalData.ordrenummer}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <h5>Kundenummer</h5>
                    {customers.map((customer, index) => (
                      <div key={index}>
                        <strong>{customer.kundenummer}</strong>
                        <p>
                          {customer.fornavn} {customer.efternavn}
                        </p>
                        <p>{customer.email}</p>
                      </div>
                    ))}
                  </div>
                  <div className="col">
                    <h5>Ordre</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Produkt</th>
                          <th>Antal</th>
                          <th>Pris</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalData.products.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
