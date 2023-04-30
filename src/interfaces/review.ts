export interface Review {
    id: string,
    toyId: string,
    content: string,
    userFullName: string,
    rating: number | null
}

export interface Reviews extends Array<Review>{}