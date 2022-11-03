// import React from 'react';
import {Routes, Route} from "react-router-dom";

// import './App.css';
import Navigation from '../Navigation';
import Footer from '../Footer';
import * as ROUTES from '../../constants/routes'

// Views
import LandingPage from '../../views/Root';
import AddProjectPage from '../../views/Projects';
import AddLevelPage from '../../views/Levels';
import AddElementPage from '../../views/Elements';
import ViewerPage from '../../views/Viewer';
import AboutPage from '../../views/About';

const App = () => {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route exact
                    path={
                        ROUTES.ROOT
                    }
                    element={<LandingPage/>}/>
                <Route path={
                        ROUTES.NEW_PROJECT
                    }
                    element={<AddProjectPage/>}/>
                <Route path={
                        ROUTES.NEW_LEVEL
                    }
                    element={<AddLevelPage/>}/>
                <Route path={
                        ROUTES.NEW_ELEMENT
                    }
                    element={<AddElementPage/>}/>
                <Route path={
                        ROUTES.VIEW
                    }
                    element={<ViewerPage/>}/>
                <Route path={
                        ROUTES.ABOUT
                    }
                    element={<AboutPage/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App;

