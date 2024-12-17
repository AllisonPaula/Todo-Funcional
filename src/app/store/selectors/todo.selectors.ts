import { createSelector } from '@ngrx/store';
import { Task } from '../../interfaces/todo.interface';

export const selectTodos = (state: any) => state.todos;
export const selectAllTodos = createSelector(selectTodos, (todos: Task[]) => todos);
