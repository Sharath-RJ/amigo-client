import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { SocketService } from '../../services/socketio.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit  {
  constructor(private authservice: AuthServiceService, private _socketService:SocketService, private _http:HttpClient) {}
  name: string = '';
  picture: string = '';
  notificationCount: number = 0;
  notificationCountSubscription!: Subscription;

  ngOnInit() {
    const loggedInUser = sessionStorage.getItem('loginedInUser');
    if (loggedInUser) this.name = JSON.parse(loggedInUser).username;

    this._http.get(`${environment.apiUrl}/notification/getNotificationCount`).subscribe((data) => {
      console.log(data);
    },(err)=>{
      console.log(err)
    });

    console.log(loggedInUser);
    const ProfilePic = sessionStorage.getItem('loginedInUser');
    console.log('ProfilePic', ProfilePic);
    if (ProfilePic) this.picture = JSON.parse(ProfilePic).profilePic;

  this.notificationCountSubscription = this._socketService.onNotificationCountUpdate().subscribe(count => {
      console.log("notification count",count);
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
