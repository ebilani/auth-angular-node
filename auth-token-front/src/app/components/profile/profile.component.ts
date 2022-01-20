import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'token-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit, AfterViewInit {
  
  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(){
    this.displaySuccessMessage();
  }
  displaySuccessMessage(){
    console.log(this.authService.userLoggedRegistered.getValue())
    if(this.authService.userLoggedRegistered.getValue()){
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        styleClass: 'success-message',
        detail: this.authService.userLoggedRegistered.getValue(),
      });
   }
  }
}
