import Main from "./components/Main";
import axios from "axios";

axios.defaults.baseURL = "https://deploypihenry-production.up.railway.app";

function App() {
  return <Main></Main>;
}

export default App;
