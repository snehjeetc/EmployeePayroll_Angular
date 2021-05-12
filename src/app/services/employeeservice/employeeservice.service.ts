import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private httpservice : HttpserviceService) { }

  addEmployee(data){
    return this.httpservice.Post('', data);
  }

  getEmployeePayrollData(){
    return this.httpservice.Get('');
  }
}
