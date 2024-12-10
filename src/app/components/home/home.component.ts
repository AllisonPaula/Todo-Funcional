import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatusTask,Task } from '../../interfaces/todo.interface';
import { TodoService } from '../../services/todo.service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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
  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef, private fb:FormBuilder, private router: Router) {
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
    this.todoService.get().subscribe((tasks) => {
      this.todos = tasks;
      this.cdr.detectChanges(); // Fuerza la detección de cambios
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
    this.editingTask = task; // Establece la tarea en modo de edición
    this.router.navigate(['edit', task.id]); // Navega al formulario de edición
  }    
  

//Editar estado de la tarea cuando este cambie
  updateTaskStatus(index: number, status: Task['status']){
    this.todos[index].status = status;
  }
  
//Cancela la edicion de la tarea
cancelEditing(): void {
  this.editingTask = null; // Cancela la edición
  this.router.navigate(['home']); // Redirige al home
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
    this.loadTasks(); // Refresca las tareas desde el servicio
  }


}