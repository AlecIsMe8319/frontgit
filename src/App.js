import Header from "./pages/Header";
import MainPage from "./MainPage";

import IdContext from "./utils/IdContext";
import "./styles/index.css";
import "./styles/portal.css";
import "./styles/button.css";

function App() {
  const tgId = "5173339107";
  return (
    <IdContext.Provider value={tgId}>
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-content">
          <MainPage />
        </div>
      </div>
    </IdContext.Provider>
  );
}

export default App;
