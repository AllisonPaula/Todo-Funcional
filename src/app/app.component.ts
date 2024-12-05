
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatusTask, Task } from './interfaces/todo.interface';
import { TodoService } from './services/todo.service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Output() updateTask = new EventEmitter<Task>(); //Decorador para salida de datos

  editFormGroup: FormGroup<{ 
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<StatusTask>;
  }>;

  editingTask: Task | null = null; //Verifica que la tarea se este editando
  isDeleting: boolean= false; //Verifica si la tarea se ha eliminado

  title = 'To-Do List'; //Titulo de la pagina
  todos: Task[] = []; //Lista dde tareas
  searchTerm: string = '';  //Busqueda de tarea
  
  //Constructor para editar tarea
  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef, private fb:FormBuilder) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.nonNullable.control('To Do' as StatusTask, Validators.required),
    });
  }

  //Cargar las tareas cuando se inicializa el proyecto
  ngOnInit(): void {
    this.loadTasks();
  }

  //Cargar las tareas
  loadTasks(): void {
    // Obtener las tareas desde el servicio usando Observable
    this.todoService.get().subscribe((tasks) => {
      this.todos = tasks;
      this.cdr.detectChanges();
    });
  }

  //Agregar tarea
  addTask(newTask: Task): void {
    this.todoService.add(newTask);
    this.loadTasks();
  }

  //Eliinar tarea
  deleteTask(taskId: number): void {
    this.todoService.delete(taskId);
    this.loadTasks();
  }

  //Valida que la tarea se pueda editar
  startEditing(task: Task): void {
    this.editingTask = task;
    this.isDeleting = false;
    this.editFormGroup.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

//Editar estado de la tarea cuando este cambie
  updateTaskStatus(index: number, status: Task['status']){
    this.todos[index].status = status;
  }

  //En edicion de tarea
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
//Cancela la edicion de la tarea
  cancelEditing(): void {
    this.editingTask = null;
    this.editFormGroup.reset({ status: 'To Do' });
  }
//La tarea se puede editar mientras no se haya borrado
  canDelete(): boolean {
    return this.editingTask === null;
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.todos.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.todos[index] = updatedTask;
    }
    this.cancelEditing();
  }
}
