import './App.css';
import {
  createBrowserRouter, 
  createRoutesFromElements, 
  Route,
  RouterProvider
} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Signup from './pages/Signup';
import Login from './pages/Login';
import RootLayout from './layouts/RootLayout';
import ProductDetails from './pages/ProductDetails';
import Post from './pages/Post';
import ThemeProvider from './store/ThemeProvider';
import AuthProvider from './store/AuthProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route basename="/alster" path="/alster" element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='post' element={<Post/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path=':id' element={<ProductDetails/>}/>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
