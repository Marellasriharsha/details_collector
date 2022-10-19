import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/Homepage";
import Details from "./components/Details";
import './styles.css';
import { Route, Routes } from 'react-router-dom'

function App() {
  // const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<Details />}/>
      </Routes>
    </div>
  );
}

export default App;