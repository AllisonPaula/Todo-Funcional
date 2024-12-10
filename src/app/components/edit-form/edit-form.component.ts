import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() editingTask!: Task | null;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() cancelEdit = new EventEmitter<void>();

  editFormGroup: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    status: FormControl<StatusTask | null>;
  }>;

  isDeleting: boolean = false;
  todos: Task[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private todoService: TodoService, private router: Router) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.control<string | null>('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.control<string | null>('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.control<StatusTask | null>('To Do', Validators.required),
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
        }
        this.editingTask = null;
      });
    }
  }

  // Editando
  onUpdate(): void {
    if (this.editFormGroup.valid && this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.editFormGroup.value,
      };
      this.todoService.updateTask(updatedTask).subscribe({
        next: () => {
          this.updateTask.emit(updatedTask); // Emite la tarea actualizada
          this.router.navigate(['/']); // Navega a la página principal
        },
        error: (err) => {
          console.error('Error al actualizar la tarea:', err);
        },
      });
    } else {
      console.warn('Formulario no válido o tarea no seleccionada.');
    }
  }

  // Cancelar edicion
  cancelEditing(): void {
    this.router.navigate(['/']);
  }
}
