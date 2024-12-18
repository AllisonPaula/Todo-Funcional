import { createAction, props } from '@ngrx/store';
import { Task } from '../../interfaces/todo.interface';

export const LOAD_TODOS = '[TODO] Load todos from localStorage';
export const ADD_TODO = '[TODO] Add todo';
export const UPDATE_TODO = '[TODO] Update todo';
export const DELETE_TODO = '[TODO] Delete todo';

export const loadTodos = createAction(LOAD_TODOS);
export const addTodo = createAction(ADD_TODO, props<{ task: Task }>());
export const updateTodo = createAction(UPDATE_TODO, props<{ task: Task }>());
export const deleteTodo = createAction(DELETE_TODO, props<{ id: number }>());