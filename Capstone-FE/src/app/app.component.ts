import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicComponent } from 'src/data-type/component';
import { Dynamic } from 'src/data-type/dynamic-component.directive';
import { AuthService } from 'src/service/auth-service/auth.service';
import {MenuBarComponent} from '../component-ui/menu-bar/menu-bar.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'capstone_fe';
  @ViewChild(Dynamic, {static: true}) menuBarHost!:Dynamic;
  @ViewChild(Dynamic, {static: true}) GridListHost!:Dynamic;
  constructor (public router:Router, public authService:AuthService) {
    this.authService.load_jwts();
    this.authService.check_token_fragment();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.navigate(['/home'])
    this.initMenubar()
  }

  initMenubar() {
    const menuBarDynamic = this.menuBarHost.viewContainerRef;
    menuBarDynamic.clear()
    menuBarDynamic.createComponent<Object>(new DynamicComponent(MenuBarComponent, {}).component)
  }
}
