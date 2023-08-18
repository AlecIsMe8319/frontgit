import Header from "./pages/Header";
import MainPage from "./MainPage";
import IdContext from "./utils/IdContext";
import { useContext } from "react";
import "./styles/index.css";
import "./styles/portal.css";
import "./styles/button.css";

function App() {
  const tgId = useContext(IdContext);

  return (
    <IdContext.Provider value={tgId}>
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-Content">
          <MainPage />
        </div>
      </div>
    </IdContext.Provider>
  );
}

export default App;
