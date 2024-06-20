import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // "ngx-toastr": "^14.3.0",
  // "node_modules/ngx-toastr/toastr.css",
//private toastr:ToastrService
  constructor(private router:Router,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error){
          if(error.status === 400){
            // if(error.error.errors){
            //   throw error.error;
            // }else{
            //   this.toastr.error(error.error.message, error.status.toString())

            // }
          }
          if(error.status === 401){
         //   this.toastr.error(error.error.message, error.status.toString())
          }

          if(error.status === 404){
            this.router.navigateByUrl('/not-found');
          };
          if(error.status === 500){
            //TODO what means NavigationExtras
            const navigationExtras:NavigationExtras={state:{error:error.error}};
            this.router.navigateByUrl('/server-error',navigationExtras);
          }
        }
        return throwError(()=>new Error(error.message))
      })
    );
  }
}
