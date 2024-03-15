/* eslint-disable react/prop-types */
import './Navbar.css';
import { isAuthenticated } from '../../auth';

export default function Navbar({name, page, number, type}) {
    function Filter() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("filter-input");
        filter = input.value.toUpperCase();
        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");
        
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[number];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
      }

    return(
        <div className='navbar-container'>
            <nav className='navbar'>
                <ul>
                    <li className='nav-link'>
                        <h1>Suite store</h1>
                    </li>
                    <li className='nav-link'>
                        <a href="/">Home</a>
                    </li>
                    {isAuthenticated() == true ?
                    <li className='nav-link'>
                        <a href="/products">Products</a>
                    </li> : null
                    }
                    {isAuthenticated() == true ?
                    <li className='nav-link'>
                        <a href="/categories">Categories</a>
                    </li> : null
                    }
                    {isAuthenticated() == false || isAuthenticated() == true ?
                    <li className='nav-link'>
                        <a href="/history">History</a>
                    </li> : null
                    }
                    <li className='nav-select'>
                        {page == "Home" || page == "Categories" || page == "Products" || page == "History" ?
                        <div className='nav-select-container'>
                            <div>
                                <p className='nav-select-text'>Filter {name} by {type}: </p>
                            </div>
                            <div>
                            <input type="text" name="" id="filter-input" onKeyUp={Filter}/>
                            </div>
                        </div>: null}
                    </li>                    
                </ul>
            </nav>
            <ul className='left-nav'>
                {isAuthenticated() == false || isAuthenticated() == true ?
                    <li>
                        <button className='del-btn' onClick={() => {
                            sessionStorage.removeItem("user");
                            location.href="http://localhost:5173/";
                        }}>LOGOUT
                        </button>
                    </li>: 
                    <li className='nav-link'>
                        <a href="/login">LOGIN</a>
                    </li>
                    }
                </ul>
        </div>
    );
}

