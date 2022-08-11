import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { addDoc, collection, Firestore } from 'firebase/firestore';
import { Task } from 'src/models/task.class';
import { GlobalArrayService } from '../global-array.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor(public router: Router, public firestore: Firestore, public globalArray: GlobalArrayService) { }

  ngOnInit(): void {
  }

  async goToBoard() {

    this.router.navigateByUrl('/board')
  }

}
