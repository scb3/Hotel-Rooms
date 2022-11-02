import logo from "./images/logo.png";
import "./App.css";
import Hotel from "./Components/Hotel";

function App() {
  return (
    <div className="App">
      <img
        src={logo}
        className="App-logo"
        alt="logo"
        style={{ height: "120px" }}
      />
      {/* Hotel Name & review */}
      <Hotel />
    </div>
  );
}

export default App;
