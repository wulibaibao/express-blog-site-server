import { Author } from './users.interface';

export type Channel = {
    name: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
    id?: string;
};
