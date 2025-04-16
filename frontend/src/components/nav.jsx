//import "./style.css";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Navs() {
  const [load, setLoad] = useState(0);
  //const brgyProfile = ['Demographic Reference', 'Physical Characteristics'];

  useEffect(() => {
    let count = 0;
    count++;
    return () => {
      $(".ts-sidebar-menu li a").each(function () {
        if ($(this).next().length > 0) {
          $(this).addClass("parent");
        }
      });
      var menux = $(".ts-sidebar-menu li a.parent");
      menux.prevAll().remove();
      $(
        '<div class="more"><i class="fa fa-angle-down"></i></div>'
      ).insertBefore(menux);

      $(".more").click(function () {
        $(this).parent("li").toggleClass("open");
      });
      $(".parent").click(function (e) {
        e.preventDefault();
        $(this).parent("li").toggleClass("open");
      });
      $(".menu-btn").click(function () {
        $("nav.ts-sidebar").toggleClass("menu-open");
      });

      $("#input-43").fileinput({
        showPreview: false,
        allowedFileExtensions: ["zip", "rar", "gz", "tgz"],
        elErrorContainer: "#errorBlock43",
        // you can configure `msgErrorClass` and `msgInvalidFileExtension` as well
      });
    };
  }, []);

  return (
    <>
      <nav className="ts-sidebar">
        <ul className="ts-sidebar-menu">
          <li className="ts-label">Search</li>
          <li>
            <input
              type="text"
              className="ts-sidebar-search"
              placeholder="Search here..."
            />
          </li>
          <li className="ts-label">Main</li>
          <li className="open">
            <Link to="/dashboard">
              <i className="fa fa-dashboard"></i>Dashboard
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-table"></i>Profile
            </a>
          </li>
          <li>
            <Link to="/manage-officials">
              <i className="fa fa-table"></i>Barangay Officials
            </Link>
          </li>

          <li>
            <a href="#">
              <i className="fa fa-desktop"></i> Barangay Profile
            </a>

            {/* {
				{brgyProfile.map((brgy, index) => (
						<li key={index}><a href="#">{brgy}</a></li> 
					))}
			 } */}

            <ul>
              <li>
                <Link to="/physical-information">Physical Information</Link>
              </li>
              <li>
                <Link to="/political-information">Political Information</Link>
              </li>
              <li>
                <Link to="/fiscal-information">Fiscal Information</Link>
              </li>
              <li>
                <Link to="/demographic-information">
                  Demographic Information
                </Link>
              </li>
              <li>
                <Link to="/socioeconomic-information">
                  Socio-economic Information
                </Link>
              </li>
              <li>
                <Link to="/recognition">Awards and Recognition</Link>
              </li>
            </ul>
          </li>

          <li>
            <a href="#">
              <i className="fa fa-sitemap"></i> Issuance
            </a>
            <ul>
              <li>
                <a href="#">Barangay Certificate</a>
              </li>
              <li>
                <a href="#">Barangay Clearance</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-sitemap"></i> Residents Information
            </a>
            <ul>
              <li>
                <a href="#">Households</a>
              </li>
              <li>
                <a href="#">Indigency</a>
              </li>
              <li>
                <a href="#">Senior Citizen</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-table"></i>Validators
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-sitemap"></i> Administrator
            </a>
            <ul>
              <li>
                <Link to="/manage-users">Manage User Accounts</Link>
              </li>
              <li>
                <a href="#">Barangay Maintenance</a>
              </li>
              <li>
                <a href="#">System Maintenance</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-files-o"></i>Summary Reports
            </a>
            <ul>
              <li>
                <a href="#">Barangay Profile</a>
              </li>
              <li>
                <a href="#">Population</a>
              </li>
              <li>
                <a href="#">Certifications</a>
              </li>
              <li>
                <a href="#">Blotter</a>
              </li>
              <li>
                <a href="#">Users Log</a>
              </li>
            </ul>
          </li>
          <ul className="ts-profile-nav">
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li className="ts-account">
              <a href="#">
                <img
                  src="img/ts-avatar.jpg"
                  className="ts-avatar hidden-side"
                  alt=""
                />{" "}
                Account <i className="fa fa-angle-down hidden-side"></i>
              </a>
              <ul>
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">Edit Account</a>
                </li>
                <li>
                  <a href="#">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </ul>
      </nav>
    </>
  );
}
