import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'token-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  showSignUp: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      user: 'login'
    }});
  }
  showSignUpForm(){
     this.showSignUp = true;
     this.router.navigate([], { relativeTo: this.route, queryParams: {
       user: 'register'
     }});
  }
  showLoginForm(){
    this.showSignUp = false;
    this.router.navigate([], { relativeTo: this.route, queryParams: {
      user: 'login'
    }});
  }
}
