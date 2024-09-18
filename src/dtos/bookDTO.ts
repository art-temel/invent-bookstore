// DTO for getting a list of books
export interface GetBooksDTO {
    id: number;
    name: string;
}

// DTO for creating a new book
export interface CreateBookDTO {
    name: string;
}

// DTO for getting details of a single book
export interface GetBookDTO {
    id: number;
    name: string;
    score: number;
}

// DTO for return books body
export interface ReturnBooksDTO {
    score: number
}