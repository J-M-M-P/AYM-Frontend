import { Product } from "../pages/Inventory";

const endpoint = "http://localhost:8080";

// ------- PRODUCTS ------- //

async function getProducts() {
    const url = `${endpoint}/api/products`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from response body
        // console.log("Products:", data); // Log the fetched data
        return data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

async function getSpecificProduct(id: number) {
    const url = `${endpoint}/api/products/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Product:", data);
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function updateInventory(id: number, products: Product) {
    const url = `${endpoint}/api/products/${id}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Inventory updated successfully!");
    } catch (error) {
        console.error("Error updating inventory:", error);
        throw error;
    }
}

export { getProducts, updateInventory, getSpecificProduct };
