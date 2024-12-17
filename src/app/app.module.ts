import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FilterTodosPipe } from './pipes/filter-todos.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoReducer } from './store/reducers/todo.reducers';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskFormComponent,
    FilterTodosPipe,
    SearchPipe,
    EditFormComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ todos: todoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, autoPause: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }