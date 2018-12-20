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
  constructor(private _userService: UserService, 
              private _activatedRoute: ActivatedRoute,
              private _authenticationService:AuthenticationService,
              private _router: Router,) {
                debugger;
                _activatedRoute.params.subscribe(params => {
                  debugger;
                  this.site = params['site'];
                  this.userToken = params['token'];
                  //Works as login
                  this._authenticationService.loginByToken(this.userToken).pipe(first())
                  .subscribe(
                      data => {
                        debugger;
                        this._router.navigate([this.site]);//['hallazgos']
                      },
                      error => {
                        debugger;
                        console.log(error);
                        this._authenticationService.logout();
                       
                        //this._router.navigate(['Sesion vencida']);
                      });
              });
              }

  ngOnInit() {
    // debugger;
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //     this.usuario = users;
    // });
}

}
