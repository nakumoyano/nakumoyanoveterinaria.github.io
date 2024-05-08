import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirection() {
    this.router.navigate(['/admin/dashboard']);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
