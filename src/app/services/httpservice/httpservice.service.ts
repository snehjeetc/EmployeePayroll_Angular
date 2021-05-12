import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  baseUrl = environment.BaseUrl;
  constructor(private httpservice : HttpClient) { }
  
  Get(url): Observable<any>{
  let options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    };
    return this.httpservice.get<any>(this.baseUrl + url, options);
  }

  Update(){

  }

  Delete(){

  }

  Post(url, data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    };
    return this.httpservice.post(this.baseUrl + url, data, options);
  }

}
