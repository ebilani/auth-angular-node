import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'token-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted: boolean;
  isSignUpFailed: boolean;
  errorMessage: string;
  roles: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  //  this.roles = this.tokenStorageService.getUser().roles;
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const username = this.loginForm.value['username'];
    const pass = this.loginForm.value['password'];
    if (this.loginForm.valid) {
      this.formSubmitted = false;
      this.authService
        .login(username, pass)
        .pipe(
          tap(
            (el) => {
              this.isSignUpFailed = false;
              console.log(el, 'el');
              this.tokenStorageService.saveToken(el.accessToken);
              this.tokenStorageService.saveUser(el);
              this.router.navigate(['profile']);
              this.authService.userLoggedRegistered.next('Logged In Successfully')
            //  this.roles = this.tokenStorageService.getUser().roles;
            },
          
            (err) => {
              this.isSignUpFailed = true;
              this.errorMessage = err.error.message;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                styleClass: 'error-message',
                detail: this.errorMessage,
              });
            }
          ),
          finalize(() => {
            this.createForm();
          })
        )
        .subscribe();
    } else {
      this.formSubmitted = true;
    }
  }
}
