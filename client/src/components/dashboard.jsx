import styles from './css/dashboard.module.css';
import SideBar from "./SideBar";
import { Main } from "./Dashboard/main";

const Dashboard = () => {
  return (
    <div className={styles["dashboard-container"]}>
      <SideBar />
      <Main />
    </div>
  );
};

export default Dashboard;