import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNav: boolean;
  email: string;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  getEmail(){
    this.email = this.auth.getEmail();
  }
  
  sayEmail(){
    alert(this.email);
  }
}
