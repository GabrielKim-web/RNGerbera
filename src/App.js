import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import routes from './routes';
import './stylesheets/App.css';

function App() {
  return (
    <div className="App">
      {/* strange className? Thanks Bootstrap! It automatically applies good shit */}
      <header className="navbar">
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
