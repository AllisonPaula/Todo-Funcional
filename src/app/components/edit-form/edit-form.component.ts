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
    title: FormControl<string>;
    description: FormControl<string>;
    status: FormControl<StatusTask>;
  }>;

  isDeleting: boolean = false;
  todos: Task[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private todoService: TodoService, private router: Router) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.nonNullable.control('To Do' as StatusTask, Validators.required),
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.todoService.getOne(id).subscribe((task) => {
        // Verifica si task es undefined y asigna null si lo es
        if (task) {
          this.editingTask = task;
          this.editFormGroup.patchValue({
            title: this.editingTask.title,
            description: this.editingTask.description,
            status: this.editingTask.status,
          });
        }
        this.editingTask = null; // Asigna null si no se encuentra la tarea
        //this.router.navigate(['**']); //Redirige a la pagina de error
      });
    }
  }

  //Editando
  onUpdate(): void {
    if (this.editFormGroup.valid && this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.editFormGroup.value,
      };
      this.todoService.updateTask(updatedTask).subscribe(() => {
        this.router.navigate(['/']); // Redirige al home al actualizar la tarea
      });
    }
  }

  //Cancelar edicion
  cancelEditing(): void {
    this.router.navigate(['/']);
  }
}