// import React from 'react';
import {Routes, Route} from "react-router-dom";

// import './App.css';
import Navigation from '../Navigation';
import * as ROUTES from '../../constants/routes'

// Views
import HomePage from '../../views/Home';
import ProjectsPage from '../../views/Projects';
import AboutPage from '../../views/About';

// function App() {

//     return (<div>
//         <Navigation/>
//         <Route exact
//             path={
//                 ROUTES.HOME
//             }
//             component={HomePage}/>
//         <Route path={
//                 ROUTES.PROJECTS
//             }
//             component={ProjectsPage}/>
//     </div>);
// }


const App = () => {
    return (<div>
        App Is Working
        <Navigation/>
        <Routes>
            <Route exact
                path={
                    ROUTES.HOME
                }
                element={<HomePage/>}/>
            <Route path={
                    ROUTES.PROJECTS
                }
                element={<ProjectsPage/>}/>
            <Route path={
                    ROUTES.ABOUT
                }
                element={<AboutPage/>}/>
        </Routes>
    </div>)
}

export default App;
