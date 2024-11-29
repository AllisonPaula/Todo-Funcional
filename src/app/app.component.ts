
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task} from './interfaces/todo.interface';
import { TodoService } from './services/todo.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'To-Do List';
  todos: Task[] = [];
  searchTerm: string = '';
  editingTask: Task | null = null;

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // Obtener las tareas desde el servicio usando Observable
    this.todoService.get().subscribe((tasks) => {
      this.todos = tasks;
      this.cdr.detectChanges(); 
    });
  }

  addTask(newTask: Task): void {
    this.todoService.add(newTask);
    this.loadTasks(); 
  }

  deleteTask(taskId: number): void {
    this.todoService.delete(taskId);
    this.loadTasks();
  }

  startEditing(task: Task): void {
    this.editingTask = { ...task }; 
  }

  cancelEditing(): void {
    this.editingTask = null;
  }

  onUpdate(updatedTask: Task): void {
    if (updatedTask) {
      this.todoService.update(updatedTask);
      this.loadTasks(); 
      this.editingTask = null;
    }
  }
}
