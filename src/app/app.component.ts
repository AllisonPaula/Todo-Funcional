
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatusTask, Task } from './interfaces/todo.interface';
import { TodoService } from './services/todo.service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Output() updateTask = new EventEmitter<Task>();

  editFormGroup: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<StatusTask>;
  }>;

  editingTask: Task | null = null;
  isDeleting: boolean= false;

  title = 'To-Do List';
  todos: Task[] = [];
  searchTerm: string = '';
  
  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef, private fb:FormBuilder) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.nonNullable.control('To Do' as StatusTask, Validators.required),
    });
  }

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
    this.editingTask = task;
    this.isDeleting = false;
    this.editFormGroup.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  updateTaskStatus(index: number, status: Task['status']){
    this.todos[index].status = status;


  }
  onUpdate(): void {
    if (this.editFormGroup.valid && this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.editFormGroup.value,
      };
      this.updateTask.emit(updatedTask);
      this.cancelEditing();
    }
  }

  cancelEditing(): void {
    this.editingTask = null;
    this.editFormGroup.reset({ status: 'To Do' });
  }

  canDelete(): boolean {
    return this.editingTask === null;
  }
}
