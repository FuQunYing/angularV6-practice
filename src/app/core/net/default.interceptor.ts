import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/internal/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private time: any;
  constructor(
    private _message: NzMessageService,
    private injector: Injector,
    private router: Router
  ) {}
  private goTo(url: string) {
    setTimeout( () => this.injector.get(Router).navigateByUrl(url), 1000);
  }
  private  handleData(res: HttpResponse<any>): Observable<any> {
    switch (res.status) {
      case 401:
        this._message.create('warning', '请先登录');
        this.goTo('/login');
        break;
      case 200:
        // 业务层级错误处理
        if (res.body.rcode !== 0) {
          this._message.create('error', `${res.body.msg}`);
        }
        if (res.body.rcode === 300) {
          this._message.create('error', `${res.body.msg}`);
          this.goTo('/login');
        }
        break;
      case 404:
        this._message.create('error', '404,API不存在');
        break;
      case 500:
        this.goTo('/login');
        break;
      case 400:
        this.goTo('/login');
        this._message.create('error', 'token验证超时');
        break;
    }
    return of(res);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpUserEvent<any>> {
      const newReq = req.clone(
        { headers: req.headers.set('Content-type', 'application/json;charset=UTF-8')}
      );
      return next.handle(newReq)
        .pipe(
          mergeMap((event: any) => {
            if (event instanceof HttpResponse && event.status === 200 ) {
              return this.handleData(event);
            }
            return of(event);
          }),
          catchError((err: HttpResponse<any>) => this.handleData(err))
        );
    }
}
