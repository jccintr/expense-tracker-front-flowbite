import { Route,Routes,HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import  Home  from './pages/Home';



function App() {
  return (
    <AuthProvider>
   
          <HashRouter>
           
              <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route element={<PrivateRoute/>}>
                      <Route path="/" element={<Home/>}/>
                  </Route>
              </Routes>
           
          </HashRouter>
     
   </AuthProvider>
  )
}

export default App
