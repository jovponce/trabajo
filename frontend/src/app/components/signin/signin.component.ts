import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ Router } from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user={
    email:'',
    pass:''
  }

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
  }

  singIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token',res.data.token);
        this.router.navigate(['/private']);
      },
      err => console.log(err)

    )
    console.log(this.user)
  }
}
