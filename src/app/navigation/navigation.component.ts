import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalArrayService } from '../global-array.service';
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {



  constructor(public globalArray: GlobalArrayService, public router: Router, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  changeSite(link) {
    this.router.navigateByUrl(link + this.globalArray.currentId)
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
    
     }

}
