// import React from "react";
// import { Link } from "react-router-dom";
// function ImageCards() {
//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         {/* First Card */}
//         <div className="col-md-4">
//           <div className="card">
            
//             <div className="card-body text-center">
//               <h5 className="card-title">Login</h5>
             
//               <Link to="/user/login" className="nav-link">
//                 <button
//                   type="button"
//                   className="btn bg-success btn-outline-light my-2 my-sm-0"
//                 >
//                   Login
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Second Card */}
//         <div className="col-md-4">
//           <div className="card">
            
//             <div className="card-body text-center">
//               <h5 className="card-title">Register</h5>
             
//               <Link to="/user/register" className="nav-link">
//                 <button
//                   type="button"
//                   className="btn bg-success btn-outline-light my-2 my-sm-0"
//                 >
//                   Register
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ImageCards;




// ```javascript
import React from "react";
import { Link } from "react-router-dom";

function ImageCards() {
  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        {/* First Card */}
        <div className="col-md-4">
          
          <div className="card h-100">
            <div className="card-body text-center">
              
              <h5 className="card-title">Login</h5>
              <img
              src="data:image/png;base64,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"
              className="card-img-top"
              alt="Sample 1"
            />
              <Link to="/user/login" className="nav-link">
                <button
                  type="button"
                  className="btn bg-success btn-outline-light my-2 my-sm-0"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Register</h5>
              <img
              src="https://cdn-icons-png.freepik.com/256/5822/5822138.png?semt=ais_hybrid"
              className="card-img-top"
              alt="Sample 2"
            />
              <Link to="/user/register" className="nav-link">
                <button
                  type="button"
                  className="btn bg-success btn-outline-light my-2 my-sm-0"
                >
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCards;
