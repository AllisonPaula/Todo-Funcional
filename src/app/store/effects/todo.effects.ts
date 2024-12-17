/*import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../../services/local-storage.service';
import { loadTodos, loadTodosSuccess, addTodo, updateTodo, deleteTodo } from '../actions/todo.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TodoEffects {
    constructor(private actions$: Actions, private localStorageService: LocalStorageService) { }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            map(() => {
                const todos = this.localStorageService.getTodos();
                return loadTodosSuccess({ todos });
            })
        )
    );

    saveTodos$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addTodo, updateTodo, deleteTodo),
                tap(({ type, ...rest }) => {
                    const todos = this.localStorageService.getTodos();
                    switch (type) {
                        case '[TODO] Add Todo':
                            todos.push(rest['todo']);
                            break;
                        case '[TODO] Update Todo':
                            const index = todos.findIndex(t => t.id === rest['todo'].id);
                            if (index > -1) todos[index] = rest['todo'];
                            break;
                        case '[TODO] Delete Todo':
                            const id = rest['id'];
                            const filteredTodos = todos.filter(t => t.id !== id);
                            this.localStorageService.saveTodos(filteredTodos);
                            return;
                    }
                    this.localStorageService.saveTodos(todos);
                })
            ),
        { dispatch: false }
    );
}*/