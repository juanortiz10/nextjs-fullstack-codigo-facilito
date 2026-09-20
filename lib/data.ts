import { cacheLife, cacheTag } from "next/cache";

export type Homework = {
    id: string;
    title: string;
    completed: boolean;
};

// Distintos boundaries de compilacion (route handlers, server actions,
// funciones 'use cache') pueden instanciar este modulo por separado.
// Se guarda el array en globalThis para que todos compartan la misma data.
const globalStore = globalThis as unknown as { __homeworks?: Homework[] };

if (!globalStore.__homeworks) {
    globalStore.__homeworks = [
        { id: '1', title: 'Learn next js', completed: false },
        { id: '2', title: 'Learn Turbopack', completed: false },
        { id: '3', title: 'Learn functions', completed: true },
    ];
}

let homeworks: Homework[] = globalStore.__homeworks;

export async function fetchHomework(title: string): Promise<Homework[]> {
    return homeworks.filter((homework) => homework.title.includes(title));
}

// Fetch de mentiras
export async function getHomeworks(): Promise<Homework[]> {
    'use cache'
    cacheLife({ stale: 5000 }) // Cuanto quiero que viva en cache
    cacheTag('getHomeworks')

    return new Promise((resolve) => {
        setTimeout(() => resolve(homeworks), 2000);
    });
}

export function getHomeworkByIdLive(id: string): Homework | undefined {
    return homeworks.find((homework) => homework.id === id);
}

export async function getHomeworkById(id: string): Promise<Homework> {
    'use cache'
    cacheLife('minutes') // Cuanto quiero que viva en cache
    cacheTag('getHomeworkById') // Nombre para invalidar la cache

    return new Promise((resolve) => {
        const homework = homeworks.filter(homework => homework.id === id);
        setTimeout(() => resolve(homework[0]), 3000);
    });
}

export async function createHomework(title: string): Promise<Homework> {
    const homework: Homework = {
        id: crypto.randomUUID(),
        title,
        completed: false,
    };

    homeworks.push(homework);

    return homework;
}

export async function deleteHomeWork(id: string): Promise<boolean> {
    const before = homeworks.length;
    // Mutacion
    homeworks = homeworks.filter((homework) => homework.id !== id);
    globalStore.__homeworks = homeworks;

    return homeworks.length < before;
}

export async function updateHomework(homeworkUpdated: Homework): Promise<Homework | undefined> {
    const homework = homeworks.find(homework => homework.id === homeworkUpdated.id);

    if (!homework) {
        return;
    }

    Object.assign(homework, homeworkUpdated);

    return homeworkUpdated; 
}