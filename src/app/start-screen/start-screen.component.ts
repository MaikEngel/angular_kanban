import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalArrayService } from '../global-array.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(public router: Router, public globalArray: GlobalArrayService) { }

  ngOnInit(): void {
    this.globalArray.startScreen = true;
  }

  goToLogin() {
    this.router.navigateByUrl('/login')
  }

}
