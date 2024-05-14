import React, { useState, useEffect } from "react";
import { FaCheck, FaSort, FaSortDown, FaSortUp, FaTimes } from "react-icons/fa";

interface Order {
  ordrenummer: number;
  kundenummer: number;
  afsendt: boolean;
  products: OrderedProduct[];
}

interface OrderedProduct {
  product: Product;
  quantity: number;
}

interface Product {
  name: string;
  price: number;
  discountPrice?: number;
  onSale?: boolean;
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
  const products: Product[] = [
    {
      name: "ANABELLE",
      price: 450,
      discountPrice: 200,
      onSale: false,
    },
    {
      name: "MATILDA",
      price: 700,
      discountPrice: 550,
      onSale: true,
    },
    {
      name: "MARTHA",
      price: 275,
      discountPrice: 210,
      onSale: true,
    },
  ];

  // Dummy data for orders
  const [orders, setOrders] = useState<Order[]>([
    {
      ordrenummer: 12345,
      kundenummer: 54321,
      afsendt: true,
      products: [
        { product: products[0], quantity: 2 },
        { product: products[1], quantity: 1 },
      ],
    },
    {
      ordrenummer: 67890,
      kundenummer: 98765,
      afsendt: false,
      products: [
        { product: products[0], quantity: 1 },
        { product: products[2], quantity: 3 },
      ],
    },
    {
      ordrenummer: 24680,
      kundenummer: 86420,
      afsendt: true,
      products: [
        { product: products[1], quantity: 2 },
        { product: products[2], quantity: 1 },
      ],
    },
    {
      ordrenummer: 13579,
      kundenummer: 97531,
      afsendt: false,
      products: [
        { product: products[2], quantity: 1 },
      ],
    },
  ]);

  // Filtered orders based on search criteria
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Selected tab
  const [selectedTab, setSelectedTab] = useState<string>("Lager");

  // Sort configurations for each column
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: string }>({
    key: "ordrenummer",
    direction: "ascending",
  });

  useEffect(() => {
    // Load selected tab from localStorage if exists
    const storedTab = localStorage.getItem("selectedTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

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
  const [isAfsendtChecked, setIsAfsendtChecked] = useState<boolean>(false);

  const openModal = (order: Order) => {
    setModalData(order);
    setIsAfsendtChecked(order.afsendt);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const updateAfsendtStatus = (ordrenummer: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.ordrenummer === ordrenummer) {
        return { ...order, afsendt: isAfsendtChecked };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  useEffect(() => {
    // Save selected tab to localStorage
    localStorage.setItem("selectedTab", selectedTab);
  }, [selectedTab]);

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
              <td
                onClick={() => openModal(order)}
                onMouseEnter={(e) => e.currentTarget.classList.add("hover-effect")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("hover-effect")}
              >
                {order.ordrenummer}
              </td>
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
                    <h5 style={{ textDecorationLine: "underline" }}>Kunde</h5>
                    <div>
                      <h6>Kundenummer</h6>
                      <p>{modalData.kundenummer}</p>
                      <h6>Fornavn</h6>
                      <p>{customers.find((customer) => customer.kundenummer === modalData.kundenummer)?.fornavn}</p>
                      <h6>Efternavn</h6>
                      <p>{customers.find((customer) => customer.kundenummer === modalData.kundenummer)?.efternavn}</p>
                      <h6>Email</h6>
                      <p>{customers.find((customer) => customer.kundenummer === modalData.kundenummer)?.email}</p>
                    </div>
                  </div>
                  <div className="col">
                    <h5 style={{ textDecorationLine: "underline" }}>Ordre</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Produkt</th>
                          <th>Antal</th>
                          <th>Pris pr. stk.</th>
                          <th>Total pris</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalData.products.map(({ product, quantity }, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{quantity} stk.</td>
                            <td>{product.onSale ? product.discountPrice : product.price} kr.</td>
                            <td>{quantity * (product.onSale ? product.discountPrice : product.price)} kr.</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={3}>Total</td>
                          <td>
                            {modalData.products.reduce((total, { product, quantity }) => {
                              return total + quantity * (product.onSale ? product.discountPrice : product.price);
                            }, 0)} kr.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4} style={{ color: "#6c757d" }}>
                            Heraf moms (25%):{" "}
                            {(
                              modalData.products.reduce((total, { product, quantity }) => {
                                return total + quantity * (product.onSale ? product.discountPrice : product.price);
                              }, 0) * 0.2
                            ).toFixed(2)} kr.
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <div className="form-check">
                              <input
                                className="form-check-input, me-2"
                                type="checkbox"
                                id="afsendtCheckbox"
                                checked={isAfsendtChecked}
                                onChange={() => setIsAfsendtChecked(!isAfsendtChecked)}
                              />
                              <label className="form-check-label" htmlFor="afsendtCheckbox">
                                Ordre afsendt fra lager
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <button
                              type="button"
                              className="btn btn-dark"
                              onClick={() => {
                                updateAfsendtStatus(modalData.ordrenummer);
                                closeModal();
                              }}
                            >
                              Opdater
                            </button>
                          </td>
                        </tr>
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
