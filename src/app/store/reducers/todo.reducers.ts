import { createReducer, on } from '@ngrx/store';
import { loadTodos, addTodo, updateTodo, deleteTodo } from '../actions/todo.actions';
import { Task } from '../../interfaces/todo.interface';

export interface TodoState {
    tasks: Task[];
}

const initialState: TodoState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

export const todoReducer = createReducer(
    initialState,
    on(loadTodos, (state) => ({
        ...state,
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    })),
    on(addTodo, (state, { task }) => {
        const updatedTasks = [...state.tasks, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { ...state, tasks: updatedTasks };
    }),
    on(updateTodo, (state, { task }) => {
        const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { ...state, tasks: updatedTasks };
    }),
    on(deleteTodo, (state, { id }) => {
        const updatedTasks = state.tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { ...state, tasks: updatedTasks };
    })
);