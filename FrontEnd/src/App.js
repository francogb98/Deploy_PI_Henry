import Main from "./components/Main";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return <Main></Main>;
}

export default App;
