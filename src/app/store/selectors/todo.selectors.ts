import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTasks = createSelector(
    selectTodoState,
    (state: TodoState) => state.tasks
);