
export interface ApiResponse<T> {
    Success: boolean;
    MessageID: string;
    Messages: string[] | null;
    MessageType: string | null;
    Message: string | null;
    Data: T | null;
    Total: number;
}