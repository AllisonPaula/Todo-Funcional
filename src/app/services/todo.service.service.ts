import { Injectable } from '@angular/core';
import { Task } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks: Task[] = [];

  constructor() {
    // Inicializa con algunas tareas
    this.tasks = [
      { id: 1, title: 'Go Home', description: 'It is almost time to go', status: 'To Do' },
      { id: 2, title: 'Finish the homework', description: 'You can do it', status: 'In Progress' },
      { id: 3, title: 'Cook', description: 'Good job', status: 'Done' },
    ];
  }

  get(): Task[] {
    return this.tasks;
  }

  add(task: Task): void {
    this.tasks.push(task); // Agregar tarea
  }

  delete(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId); // Eliminar tarea
  }
}
