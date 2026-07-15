import "../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";


function Sidebar() {

    return (

        <aside className="sidebar">

            <ul>

                <li>
                    <NavLink to="/home">
                        Gösterge Paneli
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/teachers">
                        Öğretmenler
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/students">
                        Öğrenciler
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/classes">
                        Sınıflar
                    </NavLink>
                </li>


            </ul>

        </aside>

    );

}


export default Sidebar;