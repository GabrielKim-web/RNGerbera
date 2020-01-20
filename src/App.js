import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import routes from './routes';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* this Nav header should be loaded in every component regardless of what is on screen */}
      <header className="Nav">
        <Navigation />
      </header>
      <div className="main">
        {/* render all the routes branching from the homepage */}
        {routes}
      </div>
    </div>
  );
}

export default App;
