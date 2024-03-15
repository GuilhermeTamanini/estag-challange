import {useState, useEffect} from 'react'

import ProductsTable from '../components/Tables/ProductsTable/ProductsTable';
import Navbar from '../components/Navbar/Navbar';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
    
    useEffect(() =>  {
        fetch('http://localhost/routes/categories.php?action=get', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            setCategories(data);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() =>  {
        fetch('http://localhost/routes/products.php?action=get', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch(error => console.log(error));
    }, [])

    return(
        <div>
            <Navbar page={"Products"} number={1} name={"products"} type={"name"}/>
        <div className="container">
            <div className="left-container">
                <main>
                    <form action="http://localhost/routes/products.php?action=post" method="POST">
                        <div>
                            <input className="input" id="product-input" type="text" name="name" placeholder="Product name"
                                pattern="[a-zA-Z0-9]+" title="Apenas letras e números!" maxLength={90} required />
                        </div>
                        <div className="sub-inputs">
                            <input className="sub-input" id="amount-input" type="number" name="amount" placeholder="Amount"
                                min="1" pattern="[0-9]+" title="Apenas números!" minLength="1" required />
                            <input className="sub-input" id="unitPrice-input" type="number" name="price"
                                placeholder="Unit price" min="1" pattern="[0-9]+" title="Apenas números!" minLength="1"
                                required />
                            <select className="sub-input" id="categories-select" name="category_code" required>
                                <option value="" disabled selected hidden>Categories</option>
                                {categories.map((category)=>(
                                    <option key={category.code} value={category.code}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn">Add product</button>
                        </div>
                    </form>
                </main>
            </div>
            <div className="right-container">
                <div className="table-wrapper">
                    <table id="table">
                        <thead>
                            <tr>
                                <th id="first-collun">Id</th>
                                <th id="other-collun">Product</th>
                                <th id="other-collun">Amount</th>
                                <th id="other-collun">Add Amount</th>
                                <th id="other-collun">Unit price</th>
                                <th id="other-collun">Category</th>
                                <th id="other-collun">Options</th>
                            </tr>
                        </thead>
                        <tbody id="products-tbody">
                            {//Map para renderizar a table de produtos
                            products == null ? null :products.map((product) => {
                                    if (specialCharsRegex.test(product.productname)) {
                                        return;
                                    }
                                    return(
                                       <ProductsTable key={product.code} product={product}/>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}