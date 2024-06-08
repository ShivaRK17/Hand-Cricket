import {  Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import Team from "./components/Team";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    {/* <div className="m-0 font-happyMonkey bg-gradient-to-r from-cyan-500 to-blue-500 h-min-screen flex"> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/play" element={<Play/>} />
        <Route path="/team" element={<Team/>} />
      </Routes>
      <Footer/>
    {/* </div> */}
    </>
  );
}

export default App;
