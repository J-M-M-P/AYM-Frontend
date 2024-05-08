import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSortUp, FaSortDown } from "react-icons/fa";
import { getProducts, updateInventory } from "../service/apiFacade";

export interface Product {
  id: number;
  name: string;
  qty: number;
}

interface SortConfig {
  key: keyof Product;
  direction: string;
}

function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (id: number, amount: string) => {
    if (!amount) return; // Check if amount is empty
    const updatedProducts = products.map((item) =>
      item.id === id ? { ...item, qty: item.qty + parseInt(amount) } : item
    );
    setProducts(updatedProducts);
    try {
      await updateInventory(id, updatedProducts.find((item) => item.id === id)!);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleRemove = async (id: number, amount: string) => {
    if (!amount) return; // Check if amount is empty
    const updatedProducts = products.map((item) =>
      item.id === id && item.qty >= parseInt(amount)
        ? { ...item, qty: item.qty - parseInt(amount) }
        : item
    );
    setProducts(updatedProducts);
    try {
      await updateInventory(id, updatedProducts.find((item) => item.id === id)!);
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const requestSort = (key: keyof Product) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: keyof Product) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortConfig.direction === "ascending") {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return 1;
      }
      return 0;
    }
  });

  return (
    <div>
      <h1 style={{ padding: "10vh" }}>Lager</h1>

      <table className="table" style={{ marginLeft: "10vh", marginRight: "10vh" }}>
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Name
              <div className="d-inline">
                {sortConfig.key === "name" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "name" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("qty")}
              className={getClassNamesFor("qty")}
            >
              Qty
              <div className="d-inline">
                {sortConfig.key === "qty" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "qty" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th scope="col">Tilføj/Fjern</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
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
                      const amount = (document.getElementById(
                        `amount-${item.id}`
                      ) as HTMLInputElement).value;
                      if (amount) handleAdd(item.id, amount);
                    }}
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => {
                      const amount = (document.getElementById(
                        `amount-${item.id}`
                      ) as HTMLInputElement).value;
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
