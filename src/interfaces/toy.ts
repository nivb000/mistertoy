export interface Toy {
    id: string,
    name: string,
    price: number,
    labels: string[],
    createdAt: string,
    inStock: Boolean
}


export interface Toys extends Array<Toy>{}