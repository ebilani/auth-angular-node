import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'token-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerForm: FormGroup;
  formSubmitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm()
  }
  onSubmit(): void {
    const { username, email, password } = {
      username: this.registerForm.value['username'],
      email: this.registerForm.value['email'],
      password: this.registerForm.value['password']
    };
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.formSubmitted = false;
      this.authService
      .register(username, email, password)
      .pipe(
        tap(
          (data) => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
              this.router.navigate(['profile'])
              this.authService.userLoggedRegistered.next(data.message)
          },
          (err) => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              styleClass: 'error-message',
              detail: this.errorMessage,
            });
          }
        ),
        finalize(()=>{ this.createForm()})
      )
    .subscribe();
    }else{
      this.formSubmitted = true;
    }
   
  }
  createForm(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
}
