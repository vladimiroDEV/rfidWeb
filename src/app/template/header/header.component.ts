import { Component, OnInit } from '@angular/core';
import { UserService } from "app/shared/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  UserEmail:string;
  constructor(private userService:UserService) { }

  ngOnInit() {

    this.userService.authNavStatus$.subscribe(res=>{
      this.UserEmail = this.userService.CurrentUserEmail();
    });
   
  }

  logout() {
this.userService.logout();
  }

}
