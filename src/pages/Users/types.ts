export type Tenant = {
    id: number;
    name: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};
export type User = {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    tenant: Tenant;
};

export type CreateUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    tenant: number;
};
