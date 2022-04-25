import { Author } from './users.interface';

export interface Comment {
    id?: string;
    content?: string;
    createdAt?: string;
    author?: Author;
}

export interface View {
    author?: Author;
    from?: string;
    createdAt?: string;
}

export type AuthorItem = {
    author: Author;
    createdAt: string;
};

export interface Doc {
    id?: string;
    channel: string;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
    author?: Author;
    cover?: string;
    comments?: Comment[];
    like?: AuthorItem[];
    view?: AuthorItem[];
    bad?: AuthorItem[];
}
