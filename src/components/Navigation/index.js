import React from 'react';
import {Link} from 'react-router-dom'

import * as ROUTES from '../../constants/routes'


// // const Navigation = () => {
// //     return (<div>
// //         <ul>
// //             <li>
// //                 <Link to={
// //                     ROUTES.HOME
// //                 }>
// //                     Home
// //                 </Link>
// //             </li>
// //             <li>
// //                 <Link to={
// //                     ROUTES.PROJECTS
// //                 }>
// //                     Projects
// //                 </Link>
// //             </li>
// //         </ul>
// //     </div>);
// // };

const Navigation = () => {
    return (<ul>
        <li>
            <Link to={
                ROUTES.HOME
            }>Home</Link>
        </li>
        <li>
            <Link to={
                ROUTES.PROJECTS
            }>Projects</Link>
        </li>
        <li>
            <Link to={
                ROUTES.ABOUT
            }>About</Link>
        </li>
    </ul>);;
}

export default Navigation;
