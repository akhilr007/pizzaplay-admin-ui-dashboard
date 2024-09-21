export type CreateTenant = {
    id: number;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};

export type FieldData = {
    name: string[];
    value?: string;
};
