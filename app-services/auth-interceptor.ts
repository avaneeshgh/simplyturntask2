import { UserService } from "app-services/user.service";

//just like middleware (service) -> adding our got token to request header for future requests

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable() //just like service but differently provided
export class AuthInterceptor implements HttpInterceptor {
  constructor(private ownerService: UserService) { } //to get token
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    //take from local localStorage
    const ownerToken = localStorage.getItem("Token");


    //const ownerToken = this.ownerService.getToken();

    const authReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + ownerToken),
    });

    return next.handle(authReq);
  }
}
