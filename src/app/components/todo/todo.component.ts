import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, StatusTask } from '../../interfaces/todo.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() title!: string; //Decorador de entrada de datos
  @Input() description!: string;
  @Input() status!: StatusTask;
  @Input() id!: number;
  @Output() deleteTask = new EventEmitter<number>(); //Decorador de salida de datod
  @Output() editTask = new EventEmitter<Task>();
  @Output() updatedTask = new EventEmitter<StatusTask>();

  constructor(private router: Router) { }
  //Eliminar tarea
  onDelete(): void {
    this.deleteTask.emit(this.id);
  }

  //Editar tarea
  onEdit(): void {
    this.router.navigate(['edit', this.id]); // Redirecciona a /edit/:id
  }

  //Actualizar estado de la tarea
  updateStatus() {
    this.updatedTask.emit(this.status)
  }
}