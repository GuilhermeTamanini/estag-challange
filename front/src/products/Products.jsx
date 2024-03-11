/* eslint-disable react/jsx-key */
import {useState, useEffect} from 'react'

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
            setCategories(data)
        })
        .catch(error => console.log(error + "An error ocurred when fetching categories!"))
    }, [])

    useEffect(() =>  {
        fetch('http://localhost/routes/products.php?action=get', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        })
        .catch(error => console.log(error + "An error ocurred when fetching products!"))
    }, [])


    return(
        <div className="container">
            <div className="left-container">
                <main>
                    <form action="http://localhost/routes/products.php?action=post" method="POST">
                        <div>
                            <input className="input" id="product-input" type="text" name="name" placeholder="Product name"
                                pattern="[a-zA-Z0-9]+" title="Apenas letras e números!" required />
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
                                    <option value={category.code}>{category.name}</option>
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
                    <table>
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
                            {products == null ? null
                                :products.map((product) => {
                                    if (specialCharsRegex.test(product.productname)) {
                                        return;
                                    }
                                    return(
                                        <tr key={product.productcode}>
                                            <td id='first-collun'>{product.productcode}</td>
                                            <td id="other-collun">{product.productname}</td>
                                            <td id="other-collun">{product.amount}</td>
                                            <td id="other-collun">
                                                <input type="number" name="" id="add-amount" className='edit-p'/>
                                                <button className='edit-btn'
                                                onClick={(e) => 
                                                    {   
                                                        let btn = e.target.parentElement
                                                        let inputValue = btn.children[0].value  
                                                        let newAmount = parseFloat(inputValue) + parseInt(product.amount);
                                                    
                                                        if (inputValue <= 0) {
                                                            alert("O valor tem que ser maior que zero!");
                                                            return;
                                                        }
                                                        location.href = `http://localhost/routes/products.php?action=update&code=${product.productcode}&amount=${newAmount}`;
                                                    }
                                                }
                                                >Edit
                                                </button>
                                            </td>
                                            <td id="other-collun">{product.price}</td>
                                            <td id="other-collun">{product.categoryname}</td>
                                            <td id="other-collun"><button className="del-btn" onClick={() =>{location.href=`http://localhost/routes/products.php?action=delete&code=${product.productcode}`}}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>   
    )
}