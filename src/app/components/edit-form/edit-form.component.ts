import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, StatusTask } from '../../interfaces/todo.interface';

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

  constructor(private fb: FormBuilder) {
    this.editFormGroup = this.fb.nonNullable.group({
      title: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
      status: this.fb.nonNullable.control('To Do' as StatusTask, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.editingTask) {
      this.editFormGroup.patchValue({
        title: this.editingTask.title,
        description: this.editingTask.description,
        status: this.editingTask.status,
      });
    }
  }

  onUpdate(): void {
    if (this.editFormGroup.valid && this.editingTask) {
      const updatedTask: Task = {
        ...this.editingTask,
        ...this.editFormGroup.value,
      };
      this.updateTask.emit(updatedTask);
    }
  }

  cancelEditing(): void {
    this.cancelEdit.emit();
  }
}

