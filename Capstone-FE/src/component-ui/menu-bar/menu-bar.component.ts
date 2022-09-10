import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/service/auth-service/auth.service';

@Component({
  selector: './menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {
  @ViewChild('matMenuTriggerFor') matMenuTriggerFor:any
  title:string = 'CAPSTONE APP'
  menuDataList:string[] = ['Home', 'Moives', 'Stars']
  constructor(public router:Router, public authService:AuthService, public http:HttpClient) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  routeNavigate (value:any) {
    console.log(value._selectedIndex)
    switch (this.menuDataList[value._selectedIndex]) {
      case this.menuDataList[0]:
        this.router.navigate(['/home'])
        break;
      case this.menuDataList[1]:
        this.router.navigate(['/movies/movies-list'])
        break
      case this.menuDataList[2]:
        this.router.navigate(['/actors'])
        break
      default:
        this.router.navigate(['/home'])
        break;
    }
  }

  login() {
    window.open(this.authService.build_login_link('/home'),'_self')
    console.log(this.authService.build_login_link('/home'))
  }

  logout() {
    this.authService.logout()
    window.location.reload()
  }
}
