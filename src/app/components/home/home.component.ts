import { Component, OnInit } from '@angular/core';
import { EmployeeserviceService } from 'src/app/services/employeeservice/employeeservice.service';
import { MatDialog } from '@angular/material/dialog'
import { UpdateComponent } from '../update/update.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeePayrollList: any[] = [];

  constructor(private employeePayrollService : EmployeeserviceService, private dialog : MatDialog,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.getEmployeePayrollData();
  }

  getEmployeePayrollData(){
    this.employeePayrollService.getEmployeePayrollData().subscribe((response:any)=>{
      this.employeePayrollList = response.data;
      console.log(response);
    })
  }

  deleteEmployee(id){
    this.employeePayrollService.delete(id);
  }

  updateEmployee(employee){
    const dialogBox = this.dialog.open(UpdateComponent, {
      width: '70%',
      data: {employee}
    })
  }
}
