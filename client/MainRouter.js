import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './core/Home';
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from './user/Users';
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";

const MainRouter = () => {
    return (<div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <PrivateRoute path="/user/edit/:userId" element={<EditProfile/>}/>
                <Route path="/user/:userId" element={<Profile/>}/>
            </Routes>
        </div>)
}

export default MainRouter;