import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaSortUp, FaSortDown } from "react-icons/fa";
import { getProducts, updateInventory } from "../service/apiFacade";
import { Button, Modal } from "react-bootstrap";

export interface Product {
  id: number;
  name: string;
  qty: number;
  price: number;
  discountPrice: number;
  onSale: boolean;
  categories: { id: number; name: string }[];
  colors: { id: number; colorName: string }[];
  materials: { id: number; name: string }[];
  sizes: { id: number; sizeName: string }[];
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    price: "",
    discountPrice: "",
    onSale: false,
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

  const handleAdd = async (id: number, amount: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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
  
  const handleRemove = async (id: number, amount: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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
    if (!sortConfig || !sortConfig.key) {
      return 0;
    }
    const key = sortConfig.key as keyof Product;
    if (sortConfig.direction === "ascending") {
      if (key === "categories" || key === "materials") {
        const aValues = a[key].map((item) => (item.name || item.sizeName).toLowerCase()).join(", ");
        const bValues = b[key].map((item) => (item.name || item.sizeName).toLowerCase()).join(", ");
        return aValues.localeCompare(bValues);
      } else if (key === "colors") {
        const aValues = a[key].map((item) => item.colorName.toLowerCase()).join(", ");
        const bValues = b[key].map((item) => item.colorName.toLowerCase()).join(", ");
        return aValues.localeCompare(bValues);
      } else if (key === "sizes") {
        const aValues = a[key].map((item) => item.sizeName.toLowerCase()).join(", ");
        const bValues = b[key].map((item) => item.sizeName.toLowerCase()).join(", ");
        return aValues.localeCompare(bValues);
      } else {
        return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      }
    } else {
      if (key === "categories" || key === "materials") {
        const aValues = a[key].map((item) => (item.name || item.sizeName).toLowerCase()).join(", ");
        const bValues = b[key].map((item) => (item.name || item.sizeName).toLowerCase()).join(", ");
        return bValues.localeCompare(aValues);
      } else if (key === "colors") {
        const aValues = a[key].map((item) => item.colorName.toLowerCase()).join(", ");
        const bValues = b[key].map((item) => item.colorName.toLowerCase()).join(", ");
        return bValues.localeCompare(aValues);
      } else if (key === "sizes") {
        const aValues = a[key].map((item) => item.sizeName.toLowerCase()).join(", ");
        const bValues = b[key].map((item) => item.sizeName.toLowerCase()).join(", ");
        return bValues.localeCompare(aValues);
      } else {
        return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
      }
    }
  });
  
 const handleRowClick = (product: Product, e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "BUTTON" && target.tagName !== "INPUT") {
      setSelectedProduct(product);
      setShowModal(true);
      setFormValues({
        price: product.price.toString(),
        discountPrice: product.discountPrice.toString(),
        onSale: product.onSale,
      });
    }
};


  const handleCloseModal = () => {
    setShowModal(false);
    setFormValues({ price: "", discountPrice: "", onSale: false });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormValues({ ...formValues, onSale: checked });
  };

  const handleSubmit = async () => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        price: parseFloat(formValues.price),
        discountPrice: parseFloat(formValues.discountPrice),
        onSale: formValues.onSale,
      };
      try {
        await updateInventory(selectedProduct.id, updatedProduct);
        const updatedProducts = products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p));
        setProducts(updatedProducts);
        handleCloseModal();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  return (
    <div>
      <h1 style={{ padding: "10vh" }}>Lager</h1>

      <table className="table" style={{ marginLeft: "10vh", marginRight: "10vh", maxWidth: "90vw" }}>
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Navn
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
              Antal
              <div className="d-inline">
                {sortConfig.key === "qty" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "qty" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("price")}
              className={getClassNamesFor("price")}
            >
              Salgspris
              <div className="d-inline">
                {sortConfig.key === "price" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "price" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("discountPrice")}
              className={getClassNamesFor("discountPrice")}
            >
              Tilbudspris
              <div className="d-inline">
                {sortConfig.key === "discountPrice" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "discountPrice" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("onSale")}
              className={getClassNamesFor("onSale")}
            >
              På tilbud
              <div className="d-inline">
                {sortConfig.key === "onSale" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "onSale" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("categories")}
              className={getClassNamesFor("categories")}
            >
              Kategorier
              <div className="d-inline">
                {sortConfig.key === "categories" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "categories" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("colors")}
              className={getClassNamesFor("colors")}
            >
              Farver
              <div className="d-inline">
                {sortConfig.key === "colors" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "colors" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("materials")}
              className={getClassNamesFor("materials")}
            >
              Materialer
              <div className="d-inline">
                {sortConfig.key === "materials" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "materials" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th
              scope="col"
              onClick={() => requestSort("sizes")}
              className={getClassNamesFor("sizes")}
            >
              Størrelser
              <div className="d-inline">
                {sortConfig.key === "sizes" && sortConfig.direction === "ascending" && (
                  <FaSortDown />
                )}
                {sortConfig.key === "sizes" && sortConfig.direction === "descending" && (
                  <FaSortUp />
                )}
              </div>
            </th>
            <th scope="col">Tilføj/Fjern</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((item) => (
            <tr
              key={item.id}
              className="inventory-row"
              onMouseEnter={(e) => e.currentTarget.classList.add("hover-effect")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover-effect")}
              onClick={(e) => handleRowClick(item, e)}

              
              style={{ cursor: "pointer", transition: "0.3s ease" }}
            >
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.discountPrice}</td>
              <td>{item.onSale ? "Yes" : "No"}</td>
              <td>{item.categories.map((cat) => cat.name).join(", ")}</td>
              <td>{item.colors.map((color) => color.colorName).join(", ")}</td>
              <td>{item.materials.map((mat) => mat.name).join(", ")}</td>
              <td>{item.sizes.map((size) => size.sizeName).join(", ")}</td>
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
  onClick={(e) => {
    e.stopPropagation();
    const amount = (document.getElementById(
      `amount-${item.id}`
    ) as HTMLInputElement).value;
    if (amount) handleAdd(item.id, amount, e);
  }}
>
  <FaPlus />
</button>
<button
  className="btn btn-sm btn-outline-dark"
  onClick={(e) => {
    e.stopPropagation();
    const amount = (document.getElementById(
      `amount-${item.id}`
    ) as HTMLInputElement).value;
    if (amount) handleRemove(item.id, amount, e);
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
        {selectedProduct && <Modal.Title>{selectedProduct.name}</Modal.Title>}        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="currentPrice" className="form-label">
                    Nuværende salgspris
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentPrice"
                    name="currentPrice"
                    value={selectedProduct.price}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label htmlFor="price" className="form-label">
                    Ny salgspris
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formValues.price}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="currentDiscountPrice" className="form-label">
                    Nuværende Tilbudspris
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="currentDiscountPrice"
                    name="currentDiscountPrice"
                    value={selectedProduct.discountPrice}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label htmlFor="discountPrice" className="form-label">
                    Ny Tilbudspris
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="discountPrice"
                    name="discountPrice"
                    value={formValues.discountPrice}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input, me-2"
                  id="onSale"
                  name="onSale"
                  checked={formValues.onSale}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="onSale">
                  På tilbud
                </label>
              </div>
              <Button variant="dark" onClick={handleSubmit}>
                Send
              </Button>
              <Button variant="secondary" onClick={handleCloseModal} className="ms-2">
                Annuller
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Inventory;
