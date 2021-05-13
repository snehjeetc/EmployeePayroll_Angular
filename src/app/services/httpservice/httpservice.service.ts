import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    };
  
  baseUrl = environment.BaseUrl;
  constructor(private httpservice : HttpClient) { }
  
  Get(url): Observable<any>{
    return this.httpservice.get<any>(this.baseUrl + url, this.options);
  }

  Update(id, data){
    return this.httpservice.put(this.baseUrl+"/"+id, data,this.options);
  }

  Delete(id){
    return this.httpservice.delete(this.baseUrl+"/"+id);
  }

  Post(url, data){
    return this.httpservice.post(this.baseUrl + url, data, this.options);
  }

}
