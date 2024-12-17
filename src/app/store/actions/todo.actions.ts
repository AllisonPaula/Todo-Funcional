import { createAction, props } from '@ngrx/store';
import { Task } from '../../interfaces/todo.interface';

export const loadTodos = createAction('[TODO] Load Todos');
export const addTodo = createAction('[TODO] Add Todo', props<{ task: Task }>());
export const updateTodo = createAction('[TODO] Update Todo', props<{ task: Task }>());
export const deleteTodo = createAction('[TODO] Delete Todo', props<{ id: number }>());