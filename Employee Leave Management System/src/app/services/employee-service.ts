import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { APIResponse } from '../Model/employee-model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  route = inject(Router);

  onUserLogin(obj: any) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login',
      obj
    );
  }
  getEmployee(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees'
    );
  }

  getAllLeaves(): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeaves'
    );
  }
  approveLeave(leaveId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/ApproveLeave?id=${leaveId}`
    );
  }
  rejectLeave(leaveId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/RejectLeave?id=${leaveId}`
    );
  }
  getDep(): any {
    return this.http
      .get(
        'https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments'
      )
      .pipe(map((res: any) => res.data));
  }

  getRole(): any {
    return this.http
      .get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles')
      .pipe(map((res: any) => res.data));
  }
  onSaveNewEmployee(obj: any) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee',
      obj
    );
  }

  onUpdateEmp(employeeObj: any) {
    return this.http.put(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/UpdateEmployee',
      employeeObj
    );
  }

  onEmpDelete(id: number) {
    return this.http.delete(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/DeleteEmployee?id=${id}`
    );
  }

  onAddLeave(obj: any) {
    return this.http.post(
      'https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave',
      obj
    );
  }
  getAllLeavesByEmpId(empId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeavesByEmployeeId?id=${empId}`
    );
  }

  getLeavesForApprovalBySuperwiserId(empId: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(
      `https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetLeavesForApprovalBySuperwiserId?id=${empId}`
    );
  }
}
