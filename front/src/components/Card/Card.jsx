/* eslint-disable react/prop-types */
export default function Card({product}) {
    return(
        <div>
            {console.log(product)}
            <p>{product.productcode}</p>
            <p>{product.productname}</p>
            <p>{product.amount}</p>
            <p>R$ {product.price}</p>
            <p>{product.categoryname}</p>
            <p>{product.tax}%</p>
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
                    }
                }>Add
               </button>
            </p>
        </div>
    )
}