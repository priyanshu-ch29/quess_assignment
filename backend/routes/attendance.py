from fastapi import APIRouter, HTTPException, status
from models import AttendanceCreate, Attendance
from database import get_database
from typing import List

router = APIRouter()

@router.post("/api/attendance", response_model=Attendance, status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate):
    db = get_database()
    
    employee = await db.employees.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    existing = await db.attendance.find_one({
        "employee_id": attendance.employee_id,
        "date": attendance.date
    })
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attendance already marked for this date"
        )
    
    attendance_dict = attendance.model_dump()
    
    await db.attendance.insert_one(attendance_dict)
    
    return Attendance(**attendance_dict)

@router.get("/api/attendance/{employee_id}", response_model=List[Attendance])
async def get_attendance(employee_id: str):
    db = get_database()
    
    employee = await db.employees.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    
    attendance_records = []
    async for record in db.attendance.find({"employee_id": employee_id}):
        record.pop("_id", None)
        attendance_records.append(Attendance(**record))
    
    return attendance_records
