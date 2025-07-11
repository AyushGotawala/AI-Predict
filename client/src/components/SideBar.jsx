import React, { useState } from "react";
import styles from "./css/dashboard.module.css";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from "../store/logIn";

const navItems = [
  { icon: "📊", label: "Dashboard", path: "/dashboard" },
  { icon: "🖼️", label: "Image Analysis", path: "/dashboard/image-analysis" },
  { icon: "📧", label: "Email Scanner", path: "/dashboard/email-analysis" },
  { icon: "", label: "Logout" },
];

const SideBar = ({ activeNav, setActiveNav }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout = () => {
    const cnf = confirm('Are you sure you want to log out?');
    if (cnf) {
      dispatch(logout());
      navigate('/Login');
    }
    setActiveNav(activeNav);
  };

  // Close sidebar on nav click (mobile)
  const handleNavClick = (label, path) => {
    setActiveNav(label);
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open sidebar"
      >
        <span />
        <span />
        <span />
      </button>
      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles["logo-section"]}>
          <div className={styles.logo}></div>
          <div className={styles["brand-name"]}>AI Predict</div>
          <div className={styles["brand-subtitle"]}>Intelligence Platform</div>
        </div>
        <ul className={styles["nav-menu"]}>
          {navItems.map((item) =>
            item.label === "Logout" ? (
              <li className={styles["nav-item"]} key={item.label} onClick={handelLogout}>
                <a
                  href="#"
                  className={`${styles["nav-link"]}${activeNav === item.label ? " " + styles.active : ""}`}
                >
                  <span className={styles["nav-icon"]}><IoIosLogOut /></span>
                  <span>{item.label}</span>
                </a>
              </li>
            ) : (
              <li className={styles["nav-item"]} key={item.label}>
                <a
                  href="#"
                  className={`${styles["nav-link"]}${activeNav === item.label ? " " + styles.active : ""}`}
                  onClick={() => handleNavClick(item.label, item.path)}
                >
                  <span className={styles["nav-icon"]}>{item.icon}</span>
                  <span className={styles["nav-label"]}>{item.label}</span>
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
      {/* Overlay for mobile */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  );
};

export default SideBar;