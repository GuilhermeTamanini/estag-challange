import './App.css';
import Navbar from './components/Navbar/Navbar.jsx'

import Router from './router/Router.jsx'

export default function App() {
  return (
    <div className="App">
        <Navbar />
        <Router />
    </div>
  );
}