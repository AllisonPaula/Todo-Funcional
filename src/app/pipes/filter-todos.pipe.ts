import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/todo.interface';

@Pipe({
  name: 'filterTodos',
  pure: false // Cambiar a false para que se actualice con cada cambio
})
export class FilterTodosPipe implements PipeTransform {
  transform(tasks: Task[], status: string): Task[] {
    return tasks.filter(task => task.status === status);
  }
}
