
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import SuperHomePage from './Components/SuperHomePage'
import Signup from './Components/Signup'
import Menu from './Components/Menu'
import Myorder from './Components/Myorder'
import Orderhistory from './Components/Orderhistory'
import Addcard from './Components/Addcard'
import Viewdetails from './Components/Viewdetails'
import Contact from './Components/contact'
import Checkout from './Components/Checkout'
import ManagerDashboard from './Components/ManagerDashboard'
import { AuthProvider } from './context/AuthContext'
import Nav from './Elements/Nav'
import Footer from './Elements/Footer'
import ErrorBoundary from './Components/common/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing page without Nav */}
            {/* <Route path="/" element={<SuperHomePage />} /> */}
            <Route path="/" element={<Home />} />

            
            {/* Manager Dashboard without Nav */}
            <Route path="/manager/*" element={<ManagerDashboard />} />

            {/* All other routes with Nav */}
            <Route path="/*" element={
              <>
                <Nav />
                <main>
                  <Routes>
                    <Route path="home" element={<><Home /><Footer /></>} />
                    <Route path="login" element={<Login />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="myorder" element={<Myorder />} />
                    <Route path="orderhistory" element={<Orderhistory />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="addcard" element={<Addcard />} />
                    <Route path="viewdetails" element={<Viewdetails />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="checkout" element={<Checkout />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App
