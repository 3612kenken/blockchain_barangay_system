import React from "react";
import { Link } from "react-router-dom";


export default function Header(){

    return(
        <>
            <div className="brand clearfix">
            <a href="#" className="logo"><img src="img/" className="img-responsive" alt="" /></a>
            <span className="menu-btn"><i className="fa fa-bars"></i></span>
           <div className="col-md-5"><h3 className="text-white">Blockchain-Based Barangay Information System (3BIS)</h3></div>
            <ul className="ts-profile-nav">
            
                <li><a href="#">Help</a></li>
                <li><a href="#">Settings</a></li>
                <li className="ts-account">
                    <a href="#"><img src="img/ts-avatar.jpg" className="ts-avatar hidden-side" alt="" /> Account <i className="fa fa-angle-down hidden-side" > </i></a>
                    <ul>
                        <li><a href="#">My Account</a></li>
                        <li><a href="#">Edit Account</a></li>
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
        </>

    );
}