import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() status!: string;
  @Input() id!: number;
  @Output() deleteTask = new EventEmitter<number>();

  onDelete(): void {
    this.deleteTask.emit(this.id);
  }
}
