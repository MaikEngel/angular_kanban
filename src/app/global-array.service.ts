import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalArrayService {

  todo = [];
  inProgress = [];
  testing = [];
  done = [];

  constructor() { }
}
