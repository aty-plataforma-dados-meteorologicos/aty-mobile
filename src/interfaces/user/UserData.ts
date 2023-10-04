export interface UserData{
    id?: number;
    name: string | null;
    email: string | null;
    password: string | null;
    passwordRepeat: string | null;
    role: string;
    type: any;
    isEnabled?: boolean;
}