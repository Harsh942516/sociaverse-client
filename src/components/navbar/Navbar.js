// import React, { useRef, useState } from "react";
// import "./Navbar.scss";
// import Avatar from "../avatar/Avatar";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineLogout } from "react-icons/ai";
// import LoadingBar from "react-top-loading-bar";
// function Navbar() {
//   const navigate = useNavigate();
//   const loadingref = useRef();

//   const [loading, setLoading] = useState(false);

//   function toggleLoadingBar() {
//     if (loading) {
//       setLoading(false);
//       loadingref.current.complete();
//     } else {
//       setLoading(true);
//       loadingref.current.complete();
//     }
//   }

//   return (
//     <div className="Navbar">
//       <LoadingBar height={6} color="#5f9fff" ref={loadingref} />
//       <div className="container">
//         <h2 className="banner hover-link" onClick={() => navigate("/")}>
//           Social Media
//         </h2>
//         <div className="right-side">
//           <div
//             className="profile hover-link"
//             onClick={() => navigate("/profile/harsh")}
//           >
//             <Avatar />
//           </div>
//           <div className="logout hover-link" onClick={toggleLoadingBar}>
//             <AiOutlineLogout />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useRef, useState } from "react";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  async function handleLogoutClicked() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {}
  }

  return (
    <div className="Navbar">
      <div className="container">
        <h2
          style={{ color: "darkblue" }}
          className="banner hover-link"
          onClick={() => navigate("/")}
        >
          SOCIAVERSE
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
