import  {create, StateCreator} from "zustand";
import { devtools} from 'zustand/middleware'

import { generateId } from "../helpers";

const DATE_TIME_FORMAT = 'DD-MM-YYYY DDTHH:mm';

interface Task {
    id: string,
    title: string,
    dataTime: string,
    onDoneMark: boolean,
    createdAt: string,
}

interface ToDoStore{
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    closeTask: (id: string, onDone: boolean) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const localStorageUpdate = <T>(config: StateCreator<T>):
StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
    window.localStorage.setItem('tasks', JSON.stringify(
        nextState.tasks
    ));
    }
    set(nextState, ...args);
}, get, api);


const getCurrentState = () => {
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState;
    } catch(err) {
        window.localStorage.setItem('tasks', '[]')
    }
    return [];
}

export const useToDoStore = create<ToDoStore>()(devtools(localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            dataTime: new Date();
            onDoneMark: false,
            createdAt: new Date().toLocaleTimeString('ru-RU', { timeZone: 'Asia/Vladivostok' }),
        }
        set({
            tasks: [newTask].concat(tasks)
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },

    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    },

    closeTask: (id: string, onDone: boolean) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                onDoneMark: task.id === id ? onDone : task.onDoneMark,
            }))
        });
    }
}))));