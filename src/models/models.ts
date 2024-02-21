export type Menu = {
    created_at: string;
    title: string;
    user_id: string;
    uuid: string;
    location: string;
    banner_url: string;
}

export type MenuItem = {
    id: string;
    uuid: string;
    name: string;
    created_at: string;
    description: string;
    price: number;
    image_url?: string;
    quantity?: number
};
