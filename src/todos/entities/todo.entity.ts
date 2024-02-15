import { Prisma, Todo } from "@prisma/client";

export class TodoEntity implements Todo {
    id: number;
    title: string;
    status: string;
    description: string;
    pos: Prisma.Decimal;
    userId: number;
}
