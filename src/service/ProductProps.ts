// Interface for Product properties
export interface ProductCategory {
    id: number;
    name: string;
}

export interface ProductColor {
    id: number;
    colorName: string;
}

export interface Size {
    id: number;
    sizeName: string;
}

export interface ProductMaterial {
    id: number;
    name: string;
}

export interface ProductProps {
    id: number;
    uniqueId?: string;
    chosenSize?: string;
    name: string;
    price: number;
    image: string;
    qty: number;
    onSale: boolean;
    discountPrice: number;
    categories: ProductCategory[];
    colors: ProductColor[];
    sizes: Size[];
    materials: ProductMaterial[];
}
