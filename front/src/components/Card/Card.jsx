/* eslint-disable react/prop-types */
import "./Card.css"

export default function Card({product, getCarts}) {
    return(
        <div id="card-f">
            <h1>{product.productname}</h1>
            <p><strong>Code:</strong> {product.productcode}</p>
            <p><strong>Amount:</strong> {product.amount}</p>
            <p><strong>Price:</strong> R$ {product.price}</p>
            <p className="category-p"><strong>Category:</strong> {product.categoryname}</p>
            <p><strong>Tax:</strong> {product.tax}%</p>
            <p>
                <button className="btn" onClick={()=> 
                    {   
                    //Cria o produto do card clicado ao localStorage
                    let price = parseFloat(product.price) * parseFloat((product.tax / 100)) + parseFloat(product.price)
                    let carts = JSON.parse(localStorage.getItem('carts')) ||[];
                    let percent = parseFloat(product.tax) / 100;
                    let newUnitPrice = (parseFloat(product.price) + (parseFloat(product.price) * percent));
                    let totalTax = (parseFloat(product.price) * percent);
                    let cart = 
                        {
                            productcode: product.productcode,
                            product: product.productname,
                            category: product.categoryname,
                            categorycode: product.category_code,
                            amount: 1,
                            totalAmount: product.amount,
                            price: price,
                            newUnitPrice: newUnitPrice,
                            totalTax: totalTax,
                            tax: product.tax,
                        }
                    for (let i = 0; i < carts.length; i++) {
                        if (carts[i].product === product.productname) {
                            alert("Produto já está no carrinho!")
                            return;
                        }
                    }
                    carts.push(cart)
                    localStorage.setItem('carts', JSON.stringify(carts))
                    getCarts()
                    }
                }>Add
               </button>
            </p>
        </div>
    )
}