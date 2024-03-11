import './Navbar.css';

export default function Navbar() {

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
                    <li className='nav-link'>
                        <a href="/products">Products</a>
                    </li>
                    <li className='nav-link'>
                        <a href="/categories">Categories</a>
                    </li>
                    <li className='nav-link'>
                        <a href="/history">History</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

