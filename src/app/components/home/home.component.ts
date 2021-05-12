import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice/employeeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeePayrollList: any[] = [];

  constructor(private employeePayrollService : EmployeeserviceService) { }

  ngOnInit(): void {
    this.getEmployeePayrollData();
  }

  getEmployeePayrollData(){
    this.employeePayrollService.getEmployeePayrollData().subscribe((response:any)=>{
      this.employeePayrollList = response.data;
      console.log(response);
    })
  }

}
