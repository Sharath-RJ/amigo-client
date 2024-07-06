import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { SocketService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit  {
  constructor(private authservice: AuthServiceService, private _socketService:SocketService) {}
  name: string = '';
  picture: string = '';
  notificationCount: number = 0;
  notificationCountSubscription!: Subscription;

  ngOnInit() {
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) this.name = JSON.parse(loggedInUser).username;

    console.log(loggedInUser);
    const ProfilePic = sessionStorage.getItem('loginedInUser');
    console.log('ProfilePic', ProfilePic);
    if (ProfilePic) this.picture = JSON.parse(ProfilePic).profilePic;

  this.notificationCountSubscription = this._socketService.onNotificationCountUpdate().subscribe(count => {
      this.notificationCount = count;
    });

  }

  
  ngOnDestroy(): void {
    this.notificationCountSubscription.unsubscribe();
  }


  signOut() {
    this.authservice.signOut();
  }
}
