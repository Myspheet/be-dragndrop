export class CreateTodoDto {
    id?: number;
    title: string;
    status: "Todo" | "Doing" | "Done";
    description: string;
    pos: number;
}
