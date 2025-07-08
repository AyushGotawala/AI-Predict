import { useState } from "react";
import styles from "./css/dashboard.module.css";
import { IoIosLogOut } from "react-icons/io";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { logout } from "../store/logIn";


const SideBar = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () =>{
    const cnf = confirm('please confirm Do you want to Logout');
    if(cnf){
      dispatch(logout());
      navigate('/Login');
    }
    setActiveNav("Dashboard");
  }

  const handleNavClick = (label) => {
    setActiveNav(label);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles["logo-section"]}>
        <div className={styles.logo}></div>
        <div className={styles["brand-name"]}>AI Predict</div>
        <div className={styles["brand-subtitle"]}>Intelligence Platform</div>
      </div>
      <ul className={styles["nav-menu"]}>
        {[
          { icon: "📊", label: "Dashboard" },
          { icon: "🖼️", label: "Image Analysis" },
          { icon: "📧", label: "Email Scanner" },
          { icon: "📈", label: "Analytics" },
          { icon: "⚙️", label: "Settings" },
          { icon: "❓", label: "Help" },
          { icon: "<IoIosLogOut />", label: "Logout" },
        ].map((item) =>
          item.label === "Logout" ? (
            <li className={styles["nav-item"]} key={item.label} onClick={handelLogout}>
              <a
                href="#"
                className={`${styles["nav-link"]}${
                  activeNav === item.label ? " " + styles.active : ""
                }`}
                onClick={() => handleNavClick(item.label)}
              >
                <span className={styles["nav-icon"]}><IoIosLogOut /></span>
                <span>{item.label}</span>
              </a>
            </li>
          ) : (
            <li className={styles["nav-item"]} key={item.label}>
              <a
                href="#"
                className={`${styles["nav-link"]}${
                  activeNav === item.label ? " " + styles.active : ""
                }`}
                onClick={() => handleNavClick(item.label)}
              >
                <span className={styles["nav-icon"]}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};
export default SideBar;
