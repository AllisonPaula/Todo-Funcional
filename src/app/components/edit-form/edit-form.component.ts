import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, StatusTask } from '../../interfaces/todo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  @Input() editingTask!: Task;
  @Output() updateTask = new EventEmitter<Task>();

  editFormGroup: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<StatusTask>;
  }>;

  isDeleting: boolean = false;
  todos: Task[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private todoService: TodoService, private router: Router, private cdr: ChangeDetectorRef) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.nonNullable.control('To Do' as StatusTask, Validators.required),
    });
  }
  loadTasks(): void {
    this.todoService.get().subscribe((tasks) => {
      this.todos = tasks;
      this.cdr.detectChanges(); // Fuerza la detección de cambios
    });
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.todoService.getOne(id).subscribe((task) => {
        if (task) {
          this.editingTask = task;
          this.editFormGroup.patchValue({
            title: this.editingTask.title,
            description: this.editingTask.description,
            status: this.editingTask.status,
          });
          /////////////////////////////////////////
          console.log("id:", this.editingTask.id);
          console.log("Title:", this.editingTask.title);
          console.log("description:", this.editingTask.description);
          console.log("Status:", this.editingTask.status);
        }
      });
    }
  }
  /////////////////////////////////Edit//////////////////////////////////
  onUpdate(): void {
    if (this.editFormGroup.valid && this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.editFormGroup.value,
      };
      this.todoService.updateTask(updatedTask).subscribe({
        error: () => {
          alert('Tarea no valida');

        },
        complete: () => {
          console.log("entra")
          this.updateTask.emit(updatedTask); // Emite la tarea actualizada
          this.router.navigate(['home']);
        }
      })

    } else {
      alert('Formulario no válido o tarea no seleccionada.');
    }
  }

  //Cancelar edicion
  cancelEditing(): void {
    this.router.navigate(['home']);
  }

  onTaskUpdated(updatedTask: Task): void {
    this.todoService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks(); // Refresca la lista de tareas
      this.cancelEditing(); // Cancela la edición
    });
  }
}