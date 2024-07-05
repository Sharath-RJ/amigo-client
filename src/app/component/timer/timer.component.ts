import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  timeLeft: number = 180; // 3 minutes in seconds
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        clearInterval(this.interval);
        // Optionally, add logic for when the timer ends
        console.log('Timer ended!');
      }
    }, 1000); // Update every second (1000 milliseconds)
  }
  formatTimeLeft() {
    let minutes: number = Math.floor(this.timeLeft / 60);
    let seconds: number = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
