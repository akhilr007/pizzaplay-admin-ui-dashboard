export interface PriceOption {
    priceType: "base" | "additional";
    availableOptions: string[];
}

export type PriceConfiguration = Record<string, PriceOption>;

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

export interface ProductPriceOption {
    priceType: "base" | "additional";
    availableOptions: Map<string, number>;
}

export type ProductPriceConfiguration = Record<string, PriceOption>;

export interface ProductAttribute {
    name: string;
    value: unknown;
}

export interface Product {
    name: string;
    description: string;
    image: string;
    priceConfiguration: ProductPriceConfiguration;
    attributes: ProductAttribute[];
    tenantId: string;
    categoryId: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}
