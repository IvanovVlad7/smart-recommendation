import './dashboard.css';
import MainPage from "../main/main";

interface DashboardProps {
  isDarkTheme: boolean; 
}

const Dashboard: React.FC<DashboardProps> = ({isDarkTheme}) => {
  return(
    <>
        <main >      
          <MainPage isDarkTheme={isDarkTheme} />
        </main>
    </>

  )
}

export default Dashboard;