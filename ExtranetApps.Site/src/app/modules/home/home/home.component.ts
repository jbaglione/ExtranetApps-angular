import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario[] = [];
  site: string;
  userToken: string;
  constructor(private userService: UserService, 
              private activatedRoute: ActivatedRoute,
              private authenticationService:AuthenticationService,
              private router: Router,) {
                activatedRoute.params.subscribe(params => {
                  this.site = params['site'];
                  this.userToken = params['token'];
                  debugger;

                  //Works as login
                  this.authenticationService.loginByToken(this.userToken).pipe(first())
                  .subscribe(
                      data => {
                        this.router.navigate([this.site]);//['bitacoras']
                      },
                      error => {
                        console.log(error);
                        this.authenticationService.logout();
                       
                        //tis._router.navigate(['Sesion vencida']);
                      });
              });
              }

  ngOnInit() {
    // 
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //     this.usuario = users;
    // });
}

}
