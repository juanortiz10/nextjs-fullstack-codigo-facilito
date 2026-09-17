export type Homework = {
    id: string;
    title: string;
    completed: boolean;
};

const homeworks: Homework[] = [
    { id: '1', title: 'Learn next js', completed: false },
    { id: '2', title: 'Learn Turbopack', completed: false },
    { id: '3', title: 'Learn functions', completed: true },
];

export async function getHomeworks(): Promise<Homework[]> {
    return homeworks;
}