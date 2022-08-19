import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalArrayService {

  TASKS: any = {
    'todo': [],
    'inProgress': [],
    'testing': [],
    'done': [],
    'backlog': [],
  }

  currentId: any;
  startScreen: any;

  constructor() { }
}
