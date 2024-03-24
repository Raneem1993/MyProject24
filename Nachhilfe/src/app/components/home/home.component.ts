import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn = false;
  username: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private router: Router) {
    this.auth.loggedInChange.subscribe( value => {
      this.isLoggedIn = value
      if(this.isLoggedIn) {
        this.auth.userChange.subscribe( val => {
          console.log('nav user', val)
          this.username = val?.username;
          console.log('nav username', this.username)
        })

      }
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  callLogin() {
    this.router.navigate(['/login'])
  }

  callLogout() {
    this.isLoggedIn = false;
    this.auth.logout();
    this.router.navigate(['/login'])
  }

  changeRoute(){
    this.router.navigateByUrl('/users');
  }

}



  

