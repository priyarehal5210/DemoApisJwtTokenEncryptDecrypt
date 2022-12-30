import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <Link to="/employee" className="nav-link text-white text-captalize">
              Employee
            </Link>
            <Link to="/register"  className="nav-link text-white text-captalize">register</Link>
            <Link to="/login"  className="nav-link text-white text-captalize">login</Link>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
