import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Task } from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks: Task[] = [
    { id: 1, title: 'Go Home', description: 'It is almost time to go', status: 'To Do' },
    { id: 2, title: 'Finish the homework', description: 'You can do it', status: 'In Progress' },
    { id: 3, title: 'Cook', description: 'Good job', status: 'Done' },
  ];

  // Observable para gestionar cambios en la lista de tareas
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor() { }

  // Obtener todas las tareas como Observable
  get(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  //Obtener tarea por id
  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.tasks.find((task) => task.id === id);
    return of(task);
  }

  // Obtener una tarea por ID
  getOne(taskId: number): Observable<Task | undefined> {
    const task = this.tasks.find((t) => t.id === taskId);
    return new BehaviorSubject(task).asObservable();
  }

  add(task: Task): void {
    task.id = this.tasks.length > 0 ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  delete(taskId: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task): Observable<void> {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks); // Notifica el cambio a todos los suscriptores
    }
    return of();
  }
}