
export interface Task {
  id: number;  //Id de la tarea
  title: string; //Titulo de la tarea
  description: string; //Description de la tarea
  status: StatusTask; //Estado de la tarea
}

export type StatusTask = 'To Do' | 'In Progress' | 'Done';