export interface Task {
  id: number;
  title: string;
  description: string;
  status: string; // Reemplazar por StatusTask
}

// Aplicar esta parte correctamente
//export type StatusTask = 'To Do' | 'In Progress' | 'Done';