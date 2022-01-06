import React from 'react';
import "./App.css";
import AddForm from "./comp/AddForm";
import ListComp from "./comp/ListComp";


function App() {
  return (
    <div className="App">
      <div className="AppComp">
        <AddForm />
      </div>
      <div className="AppComp">
        <ListComp />
      </div>
      
    </div>
  )
}

export default App