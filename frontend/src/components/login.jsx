import React from "react";
import { Link } from 'react-router-dom';
import "./style.css";

export default function Login(){

    return(
<> <div className="login-page bk-img bg-img">
		<div className="form-content">
			<div className="container">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className=" mt-4x">Sign in</div>
						<div className="well row  pb-3x bk-light">
                            <h2 className="text-center text-bold pb-2x">Blockchain-Based Barangay Information System (3BIS)</h2>
							<div className="col-md-8 col-md-offset-2">
								<form>

									<label for="" className="text-uppercase text-sm">Your Username or Email</label>
									<input type="text" placeholder="Username" className="form-control mb" />

									<label for="" className="text-uppercase text-sm">Password</label>
									<input type="password" placeholder="Password" className="form-control mb" />

								

									 <Link to="/dashboard" className="btn btn-success btn-block">LOGIN</Link>

								</form>
							</div>
						</div>
						<div className="text-center text-light">
							<a href="#" className="text-light">Forgot password?</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div></>
    );
}