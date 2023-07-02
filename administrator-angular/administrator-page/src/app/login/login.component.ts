import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('submitButton', { static: true }) submitButtonRef: ElementRef | undefined;
  login_submit(event: Event): void {
    console.log('submitting login...')
    event.preventDefault();

    const usernameValue = (<HTMLInputElement>document.getElementById("username")).value;
    const passwordValue = (<HTMLInputElement>document.getElementById("password")).value;
    const errorMessage = document.getElementById("error-message");

    fetch('http://localhost:8000/api/login_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      })
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Inloggen gelukt');
          return response.json();
        } else {
          console.log('Inloggen niet gelukt');
          return
        }
      })
      .then(data => {
        if (data.token) {
          console.log("Token: " + data.token);
          localStorage.setItem('jwtToken', data.token);
          window.location.href = 'visualisation';
        } else {
          console.log('JWT token niet gevonden');
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.submitButtonRef) {
      this.submitButtonRef.nativeElement.addEventListener('click', (event: Event) => this.login_submit(event));
    }

    // Notification message
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const notificationMessage = urlParams.get('message');
    const notificationElement = document.getElementById('notification-message');
    if (notificationMessage && notificationElement) {
      notificationElement.textContent = notificationMessage;
    }
  }
}
