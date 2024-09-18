export interface CreateUserDTO {
    name: string;
}

export interface UserDTO {
    id: number;
    name: string;
}

export interface UserWithBorrowingsDTO {
    id: number;
    name: string;
    books: {
        past: PastBorrowingDTO[];
        present: PresentBorrowingDTO[];
    };
}

interface PastBorrowingDTO {
    name: string;
    userScore: number;
}

interface PresentBorrowingDTO {
    name: string;
}
