export interface ITask {
    id: string
    created_at: string
    user_id: string;
    title: string;
    decs: string;
    xpReward: number;
    dedline: string;
    difficult: number;
    completed: boolean;
}