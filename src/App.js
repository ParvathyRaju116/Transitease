import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './USER/Pages/Auth/Auth';
import Home from './USER/Pages/Home/Home';
import Findbus from './USER/Pages/FindBus/Findbus';
import Profile from './USER/Pages/Profile/Profile';
import AdminAuth from './ADMIN/Pages/Admin_Auth/AdminAuth';
import AdminDashboard from './ADMIN/Pages/Admin_Dashboard/AdminDashboard';
import Request from './ADMIN/Pages/Request/Request';
import BusDetails from './ADMIN/Pages/Bus Details/BusDetails';
import BusOwnerHome from './BUS OWNER/Pages/BusOwnerHome/BusOwnerHome';
import BusOwnerAuth from './BUS OWNER/Pages/BusOwner Auth/BusOwnerAuth';
import AddRoute from './ADMIN/Pages/Add Route/AddRoute';
import BusOwnerProfile from './BUS OWNER/Pages/BusOwnerProfile/BusOwnerProfile';
import OwnersList from './ADMIN/Pages/BusOwner List/OwnersList';
import BusOwnerRoutes from './BUS OWNER/Pages/BusOwnerRoutes/BusOwnerRoutes';
import AssignedRoutes from './ADMIN/Pages/Assigned Routes/AssignedRoutes';
import PageNotFound from './PageNotFound';




function App() {
  return (
    <div className="App">
      <Routes>
       
       <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

        {/* USER */}
        <Route path='/' element={<Auth />} ></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/find-bus' element={<Findbus></Findbus>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>

        {/* ADMIN */}
        <Route path='/admin-auth' element={<AdminAuth></AdminAuth>}></Route>
        <Route path='/admin-dashbord' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/admin-request/:id' element={<Request></Request>}></Route>
        <Route path='/admin-bus-details' element={<BusDetails></BusDetails>}></Route>
        <Route path='/add-bus-route' element={<AddRoute></AddRoute>}></Route>
        <Route path='/owner-list' element={<OwnersList></OwnersList>}></Route>
        <Route path='/admin-assigned-routes' element={<AssignedRoutes></AssignedRoutes>}></Route>


        {/* BUS OWNER */}
        <Route path='/bus-owner-auth' element={<BusOwnerAuth></BusOwnerAuth>}></Route>
        <Route path='/bus-owner-home-page' element={<BusOwnerHome></BusOwnerHome>}></Route>
        <Route path='/bus-owner-profile' element={<BusOwnerProfile></BusOwnerProfile>}></Route>
        <Route path='/bus-owner-routes' element={<BusOwnerRoutes></BusOwnerRoutes>}></Route>

      </Routes>



    </div>
  );
}

export default App;
