export interface OrderList {
    OrderSummary: string;
    address: string;
    amount: number;
    status: string;
    loading: boolean;
}

export const list: OrderList[] = [
    {
        OrderSummary: "Peperoni, Margarita ...",
        address: "Bandra, Mumbai",
        amount: 1200,
        status: "preparing",
        loading: false
    },
    {
        OrderSummary: "Paneer, Chicken BBQ ...",
        address: "Balurghat, West bengal",
        amount: 2000,
        status: "out for delivery",
        loading: false
    },
    {
        OrderSummary: "Paneer, Chicken BBQ ...",
        address: "Balurghat, West bengal",
        amount: 2000,
        status: "out for delivery",
        loading: false
    },
    {
        OrderSummary: "Paneer, Chicken BBQ ...",
        address: "Balurghat, West bengal",
        amount: 2000,
        status: "out for delivery",
        loading: false
    },
    {
        OrderSummary: "Paneer, Chicken BBQ ...",
        address: "Balurghat, West bengal",
        amount: 2000,
        status: "out for delivery",
        loading: false
    },
    {
        OrderSummary: "Paneer, Chicken BBQ ...",
        address: "Balurghat, West bengal",
        amount: 2000,
        status: "out for delivery",
        loading: false
    }
];

export const PER_PAGE = 6;

export const colorMapping = {
    received: "processing",
    confirmed: "orange",
    prepared: "volcano",
    preparing: "processing",
    "out for delivery": "purple",
    delivered: "success"
};
