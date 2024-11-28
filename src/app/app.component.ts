import { ChangeDetectorRef, Component } from '@angular/core';
import { Task } from './interfaces/todo.interface';
import { TodoService } from './services/todo.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'To-Do List';
  todos: Task[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks(); // Cargar las tareas al inicializar
  }

  loadTasks(): void {
    // Cargar las tareas desde el servicio
    this.todos = this.todoService.get();
    this.cdr.detectChanges(); 
  }

  addTask(newTask: Task): void {
    // Usar el servicio para agregar la nueva tarea
    this.todoService.add(newTask);
    this.loadTasks(); // Recargar las tareas para reflejar el cambio
  }

  deleteTask(taskId: number): void {
    this.todoService.delete(taskId);
    this.loadTasks(); // Recargar las tareas después de eliminar una tarea
  }
}
