
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, StatusTask } from '../../interfaces/todo.interface';


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

  //Eliminar tarea
  onDelete(): void {
    this.deleteTask.emit(this.id);
  }

  //Editar tarea
  onEdit(): void {
    this.editTask.emit({ title: this.title, description: this.description, status: this.status, id: this.id });
  }

  //Actualizar estado de la tarea
  updateStatus(){
    this.updatedTask.emit(this.status)
  }

  
}