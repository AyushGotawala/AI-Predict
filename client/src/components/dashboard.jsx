import React, { useState } from "react";
import styles from './css/dashboard.module.css';
import SideBar from "./SideBar";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  return (
    <div className={styles["dashboard-container"]}>
      <SideBar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className={styles["main-content"]}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
