import { EthProvider } from "./contexts/EthContext";
import Ipfs from "./components/Ipfs";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Ipfs />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
