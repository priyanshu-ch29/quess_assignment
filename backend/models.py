from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import date

class EmployeeBase(BaseModel):
    full_name: str = Field(..., min_length=1, description="Full name of the employee")
    email: EmailStr = Field(..., description="Email address of the employee")
    department: str = Field(..., min_length=1, description="Department of the employee")

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    employee_id: str = Field(..., description="Unique employee ID")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "employee_id": "EMP001",
                "full_name": "John Doe",
                "email": "john.doe@company.com",
                "department": "Engineering"
            }
        }
    )

class AttendanceBase(BaseModel):
    employee_id: str = Field(..., description="Employee ID")
    date: str = Field(..., description="Attendance date in YYYY-MM-DD format")
    status: str = Field(..., pattern="^(Present|Absent)$", description="Attendance status")

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "employee_id": "EMP001",
                "date": "2026-01-21",
                "status": "Present"
            }
        }
    )
