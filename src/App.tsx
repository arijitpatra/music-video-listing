import { MainPage } from "./pages/Main";
import { useNavigatorOnLine } from "./hooks/useNavigatorOnLine";
import "./App.scss";

function App() {
  const isOnline = useNavigatorOnLine();

  return (
    <>
      {isOnline ? (
        <div className="navigatorBar navigatorBar--online">You are online</div>
      ) : (
        <div className="navigatorBar navigatorBar--offline">
          You are offline, please check the internet connection
        </div>
      )}
      <MainPage />
    </>
  );
}

export default App;
