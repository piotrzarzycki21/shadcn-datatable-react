export class AppConst {
    public static readonly MIN_AGE = 18;
    public static readonly MAX_AGE = 100;
}

export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}