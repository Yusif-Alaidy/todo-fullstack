import { Component, HostListener, inject, OnInit, ElementRef } from '@angular/core';
import { Task } from '../../services/task';
import { ITask } from '../../interfaces/itask';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit{

//#region Display tasks
  apiTask = inject(Task);
  ngOnInit(): void {
    this.apiTask.loadTasks();
  }
//#endregion

//#region Create Tasks with Template-driven-form
newTask:ITask = {} as ITask;

onSubmit(){
  console.log("sumbit clicked")
  this.newTask.isCompleted = false;
  this.apiTask.addTask(this.newTask);
}
//#endregion

//#region delete task
delete(id:number){
  this.apiTask.deleteTask(id);

}
//#endregion

//#region Edit Task
  private elementRef = inject(ElementRef)
  editingTaskId: number | null = null;
  editTitle = '';

  startEdit(task: ITask) {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
  }

  saveEdit(task: ITask) {
    const updatedTask = { ...task, title: this.editTitle };
    this.apiTask.editTask(task.id, updatedTask)
    this.editingTaskId = null;
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
  if (this.editingTaskId === null) return;

  const target = event.target as HTMLElement;
  const isInput = target.tagName === 'INPUT';
  const isButton = target.closest('button') !== null;

  if (!isInput && !isButton) {
    this.cancelEdit();
  }
}
  //#endregion

//#region completed
  completed(task:ITask){
  task.isCompleted = true ? task.isCompleted==false: false;
  this.apiTask.editTask(task.id, task);
  }
//#endregion
}
