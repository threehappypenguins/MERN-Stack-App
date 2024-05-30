import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages & components
import Home from './pages/Home'
import Users from './pages/Users'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route
              path="/users"
              element={<Users />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
