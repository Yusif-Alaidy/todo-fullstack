import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ITask } from '../interfaces/itask';
import { environment } from '../../environments/environment.development';
import { error } from 'console';
@Injectable({
  providedIn: 'root',
})
export class Task {
  private httpClient = inject(HttpClient)
  tasks = signal<ITask[]>([]);

  //#region loadtasks
  loadTasks(){
    let url = `${environment.baseUrl}`
    this.httpClient.get<ITask[]>(url).subscribe({
      next:(res)=>{this.tasks.set(res)},
      error:(er)=>{console.log(er)}
    })
  }
  //#endregion

  //#region add tasks
  addTask(task:Omit<ITask,'id'>){
    return this.httpClient.post<ITask>(`${environment.baseUrl}`,task).subscribe({
      next:(newTask)=>{this.tasks.update(current => [...current,newTask])},
      error:(err)=>{console.error(err)}

    });
  }
  //#endregion

  //#region delete task
  deleteTask(id:number){
    return this.httpClient.delete<ITask>(`${environment.baseUrl}${id}`).subscribe({
      next:()=>{
        this.tasks.update(current => current.filter(t=>t.id !== id));
      },
      error:(err)=>{console.error(err)}
    })
  }
  //#endregion

  //#region edit task
  editTask(id: number, task: ITask) {
  return this.httpClient.put<ITask>(`${environment.baseUrl}${id}`, task).subscribe({
    next: () => {
      this.tasks.update(current => current.map(t => t.id === task.id ? task : t));
    },
    error: (err) => console.error(err)
  });
}
  //#endregion

}
