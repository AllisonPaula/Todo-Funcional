import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/todo.interface';

@Pipe({
  name: 'search',
  pure: false // Cambiar a false para que se actualice con cada cambio
})
export class SearchPipe implements PipeTransform {
  transform(tasks: Task[], searchTerm: string): Task[] {
    return tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
