import { EthProvider } from "./contexts/EthContext";
import Ipfs from "./components/Ipfs";
import DynamicImage from "./components/Ipfs/BlockImage";

function App() {
  return (
    <EthProvider>
      <div id="App" className="flex flex-col justify-between mx-auto max-w-5xl px-4 landscape xl:max-w-screen-2xl">

        <nav className="flex items-center justify-between py-10">
          <div className="flex items-center justify-between py-4">
            <a aria-label="Portfolio" href="/" className="font-black ">IPFS File Upload</a>
          </div>
          <div className="flex items-center justify-between  space-x-2">
            <div className="hidden lg:block">
              <a aria-label="About" href="/"
                className="link-underline rounded-t py-1 px-2 text-gray-900 hover:bg-gray-200   sm:py-2 sm:px-3">acceuil</a>
            </div>
          </div>
        </nav>
        <header className="flex flex-col items-center justify-center bg-green-300 h-[70vh] rounded-3xl">
          <h1 className="text-5xl font-bold text-center">
            IPFS File Upload
          </h1>
          <div>
            <p className="text-lg text-center">
              This dApp allows you to upload files to IPFS and store the resulting hash on the Ethereum blockchain.
            </p>
            <p className="text-lg text-center">
              The hash is stored on the blockchain using a smart contract.
            </p>
          </div>
          <Ipfs />
        </header>
        <main className="flex flex-col items-center justify-center py-10">
          <DynamicImage />
        </main>
        <footer className="flex items-center justify-center py-10">
          <p className="text-center">
            Built with <span aria-label="love" role="img">❤️</span> by <a aria-label="Portfolio" href="/" className="font-bold">Innomate</a>
          </p>
        </footer>
      </div>
    </EthProvider>
  );
}

export default App;
