import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="flex justify-between items-center py-4 container mx-auto px-4">
        <div className="text-2xl font-bold">
          <strong>tect</strong>
        </div>

        <div className="flex space-x-4 ml-auto">
          <Link to="/post" className="m-2 px-4 py-2 rounded-lg hover:bg-gray-700">
            Create Employee
          </Link>
          <Link to="/" className="m-2 px-4 py-2 rounded-lg hover:bg-gray-700">
            Employee
          </Link>
          <Link to="/employee" className="m-2 px-4 py-2 rounded-lg hover:bg-gray-700">
            Save Employee
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
