import { cacheLife, cacheTag } from "next/cache";

export type Homework = {
    id: string;
    title: string;
    completed: boolean;
};

let homeworks: Homework[] = [
    { id: '1', title: 'Learn next js', completed: false },
    { id: '2', title: 'Learn Turbopack', completed: false },
    { id: '3', title: 'Learn functions', completed: true },
];

// Fetch de mentiras
export async function getHomeworks(): Promise<Homework[]> {
    'use cache'
    cacheLife({ stale: 5000 }) // Cuanto quiero que viva en cache
    cacheTag('getHomeworks')

    return new Promise((resolve) => {
        setTimeout(() => resolve(homeworks), 2000);
    });
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

export async function deleteHomeWork(id: string): Promise<boolean> {
    const before = homeworks.length;
    // Mutacion
    homeworks = homeworks.filter((homework) => homework.id !== id);

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

export async function getHomeworkByTitle(title: string): Promise<Homework[] | undefined> {
    return homeworks.filter((homework) => homework.title.toLowerCase().includes(title.toLowerCase()));
}

export async function createHomework(title: string): Promise<Homework | null> {
    try {
        const nextHomework: Homework = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        };

        homeworks.push(nextHomework);
        return nextHomework; 
    } catch (error) {
        console.error(error);
        return null;
    }
}