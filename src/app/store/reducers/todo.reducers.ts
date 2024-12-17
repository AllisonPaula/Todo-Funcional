import { createReducer, on } from '@ngrx/store';
import { loadTodos, addTodo, updateTodo, deleteTodo } from '../actions/todo.actions';
import { Task } from '../../interfaces/todo.interface';

const initialState: Task[] = JSON.parse(localStorage.getItem('todos') || '[]');

export const todoReducer = createReducer(
    initialState,
    on(loadTodos, state => state),
    on(addTodo, (state, { task }) => {
        const updatedState = [...state, task];
        localStorage.setItem('todos', JSON.stringify(updatedState));
        return updatedState;
    }),
    on(updateTodo, (state, { task }) => {
        const updatedState = state.map(t => t.id === task.id ? task : t);
        localStorage.setItem('todos', JSON.stringify(updatedState));
        return updatedState;
    }),
    on(deleteTodo, (state, { id }) => {
        const updatedState = state.filter(t => t.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedState));
        return updatedState;
    })
);