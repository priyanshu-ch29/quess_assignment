from fastapi import APIRouter, HTTPException, status
from models import EmployeeCreate, Employee
from database import get_database
from typing import List
import random
import string

router = APIRouter()

def generate_employee_id():
    return f"EMP{random.randint(1000, 9999)}"

@router.post("/api/employees", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate):
    db = get_database()
    existing = await db.employees.find_one({"email": employee.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee with this email already exists"
        )
    
    while True:
        employee_id = generate_employee_id()
        existing_id = await db.employees.find_one({"employee_id": employee_id})
        if not existing_id:
            break
    
    employee_dict = employee.model_dump()
    employee_dict["employee_id"] = employee_id
    
    await db.employees.insert_one(employee_dict)
    
    return Employee(**employee_dict)

@router.get("/api/employees", response_model=List[Employee])
async def get_employees():
    db = get_database()
    employees = []
    
    async for employee in db.employees.find():
        employee.pop("_id", None)
        employees.append(Employee(**employee))
    
    return employees

@router.delete("/api/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(employee_id: str):
    db = get_database()
    
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    await db.employees.delete_one({"employee_id": employee_id})
    
    await db.attendance.delete_many({"employee_id": employee_id})
    
    return None
