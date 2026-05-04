import React from "react";
import { Link } from "react-router-dom";


function Sidebar() {
  return (

    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="mdi mdi-grid-large menu-icon"></i>
            <Link className="nav-link" to="#">Dashboard</Link>
          </a>
        </li>
        <li className="nav-item nav-category">UI Elements</li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">

            <i className="menu-icon mdi mdi-account-circle-outline"></i>
            <span className="menu-title">Users</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="ui-basic">
            <ul className="nav flex-column sub-menu">

              <li className="nav-item">
                <Link className="nav-link" to="/users">List Of Users</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Add-user">Add New User</Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
            <i className="menu-icon mdi mdi-card-text-outline"></i>
            <span className="menu-title">Product</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="form-elements">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/products">List Of Products</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/add-product">Add New Product</Link>
              </li>

            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
            <i className="menu-icon mdi mdi-floor-plan"></i>
            <span className="menu-title">Category</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="charts">
            <ul className="nav flex-column sub-menu">
               <li className="nav-item">
                <Link className="nav-link" to="/category">Category list</Link>
              </li>

               <li className="nav-item">
                <Link className="nav-link" to="/add-category">Add Category</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
            <i className="menu-icon mdi mdi-table"></i>
            <span className="menu-title">Sub Categories</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="tables">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/subcategory">Subcategory list</Link>
              </li>

               <li className="nav-item">
                <Link className="nav-link" to="/add-subcategory">Add Subcategory</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
            <i className="menu-icon mdi mdi-layers-outline"></i>
            <span className="menu-title">Orders</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="icons">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders List</Link>
              </li>

            </ul>
          </div>
        </li>

      </ul>
    </nav>

  );
}

export default Sidebar;