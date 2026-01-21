import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">HR</span>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">HRMS Lite</h1>
                    </div>

                    <div className="flex space-x-1">
                        <Link
                            to="/employees"
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/employees')
                                ? 'bg-primary-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Employees
                        </Link>
                        <Link
                            to="/attendance"
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive('/attendance')
                                ? 'bg-primary-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            Attendance
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
