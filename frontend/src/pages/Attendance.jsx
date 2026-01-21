import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

function Attendance() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAttendance, setLoadingAttendance] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            fetchAttendance(selectedEmployee);
        } else {
            setAttendanceRecords([]);
        }
    }, [selectedEmployee]);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/api/employees');
            setEmployees(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendance = async (employeeId) => {
        try {
            setLoadingAttendance(true);
            const response = await api.get(`/api/attendance/${employeeId}`);
            setAttendanceRecords(response.data);
        } catch (err) {
            console.error('Failed to fetch attendance:', err);
            setAttendanceRecords([]);
        } finally {
            setLoadingAttendance(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEmployee) {
            setFormErrors({ employee: 'Please select an employee' });
            return;
        }

        try {
            setSubmitting(true);
            setFormErrors({});
            await api.post('/api/attendance', {
                employee_id: selectedEmployee,
                date: formData.date,
                status: formData.status,
            });
            setFormData({
                date: new Date().toISOString().split('T')[0],
                status: 'Present',
            });
            fetchAttendance(selectedEmployee);
        } catch (err) {
            setFormErrors({
                submit: err.response?.data?.detail || 'Failed to mark attendance',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} onRetry={fetchEmployees} />;

    const selectedEmployeeData = employees.find((emp) => emp.employee_id === selectedEmployee);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
                <p className="text-gray-600 mt-1">Track and manage employee attendance</p>
            </div>

            {employees.length === 0 ? (
                <EmptyState
                    icon={
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    }
                    title="No employees found"
                    description="Please add employees first before marking attendance"
                />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mark Attendance Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Mark Attendance</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {formErrors.submit && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {formErrors.submit}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Employee <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={selectedEmployee}
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${formErrors.employee ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Choose an employee...</option>
                                    {employees.map((emp) => (
                                        <option key={emp.employee_id} value={emp.employee_id}>
                                            {emp.full_name} ({emp.employee_id})
                                        </option>
                                    ))}
                                </select>
                                {formErrors.employee && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.employee}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    max={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="Present"
                                            checked={formData.status === 'Present'}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Present</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value="Absent"
                                            checked={formData.status === 'Absent'}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Absent</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting || !selectedEmployee}
                                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Marking...' : 'Mark Attendance'}
                            </button>
                        </form>
                    </div>

                    {/* Attendance Records */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance History</h2>

                        {!selectedEmployee ? (
                            <div className="text-center py-12 text-gray-500">
                                <svg
                                    className="w-12 h-12 mx-auto mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                <p>Select an employee to view attendance records</p>
                            </div>
                        ) : loadingAttendance ? (
                            <LoadingSpinner />
                        ) : attendanceRecords.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <svg
                                    className="w-12 h-12 mx-auto mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <p>No attendance records for {selectedEmployeeData?.full_name}</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {attendanceRecords
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((record, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{formatDate(record.date)}</p>
                                                <p className="text-sm text-gray-500">{selectedEmployeeData?.full_name}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${record.status === 'Present'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {record.status}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Attendance;
