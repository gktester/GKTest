import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService, JwtService} from 'src/app/core/services';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService,
        private authenticationService: AuthenticationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token         = this.jwtService.getToken();
        const currentUser   = this.authenticationService.getUserSubjectValue();
        const isApiUrl = req.url.startsWith(environment.api);
        if (token && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                }
            });
        }

        return next.handle(req)
            .pipe(catchError((err) => {
                return err;
            }))
            .pipe(map((evt: any) => {
                return evt;
            }));
    }
}
