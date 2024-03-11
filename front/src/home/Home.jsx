/* eslint-disable react/jsx-key */
import './Card.css'
import { useEffect, useState } from 'react'

function Home() {
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('carts')) || []);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);

    var specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;

    //busca os produtos
    useEffect (() => {
       fetch("http://localhost/routes/products.php?action=get")
       .then(response => response.json())
       .then(data => setProducts(data))
       .catch(error => console.log(error + "An error ocurred when fetching products!"))
    },[])

    //Busca a taxa total e o  preço total
    useEffect (() => {
        getTotal()
    }, [carts])
   
    function RenderCarts() {
        setCarts(JSON.parse(localStorage.getItem('carts')))
    }

    //Função que cria o preço total e a taxa total
    function getTotal() {
        let carts = JSON.parse(localStorage.getItem('carts'));
        let getTotalTax = 0;
        let getTotalPrice = 0;

        if(carts){
            carts.forEach(cart => {
                getTotalTax += parseFloat(cart.totalTax) * cart.amount
                getTotalPrice += parseFloat(cart.newUnitPrice) * cart.amount
            });}
        setTotal((parseFloat(getTotalPrice)).toFixed(2))
        setTax((parseFloat(getTotalTax)).toFixed(2))
    }

    //Função para mudar o amount no local storage conforme o valor do input muda
    function GetCartsAmounts(e) {
        let carts = JSON.parse(localStorage.getItem('carts'));
        let trow = e.target.parentElement.parentElement;
        let name = trow.children[1].innerText;
        let amount = trow.querySelector(".quantity").value;

        carts.forEach(cart => {
            if (cart.product == name) {
                cart.amount = parseInt(amount)
            }
        })
        localStorage.setItem('carts', JSON.stringify(carts));
        getTotal()
    }

    //Função para postar a order
    function Finish() {
        let getTotals = JSON.parse(localStorage.getItem('totals')) || []
        let carts = JSON.parse(localStorage.getItem('carts'))
        if (carts && carts.length > 0) {
            let totals = {totalPrice: total, totalTax:tax}
            getTotals.push(totals)
            getTotal();
            location.href = `http://localhost/routes/orders.php?action=post&total=${total}&tax=${tax}`
            localStorage.setItem("totals", JSON.stringify(getTotals))
        } else {
            console.log("carrinho vazio");
        }
    }

    return(
        <div className="container">
            <div className="left-container">
                <div className='sub-container'>
                    <div className="card-container" id="card-container">
                        {products === null ? "Não há produtos em estoque"
                        //Map para renderizar os cards
                            :products.map((product) => {
                               if (specialCharsRegex.test(product.productname)) {
                                   return;
                               }
                               if(product.amount == 0 ) {
                                return;
                               }
                               return(
                                    <div>
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
                                                    RenderCarts()
                                                    getTotal()
                                                }
                                            }>Add
                                           </button>
                                       </p>
                                   </div>
                                )
                        })}
                    </div>
                </div>
            </div>
            <div className="right-container">
                <div className="table-container">
                    <table className="table" id="table">
                        <thead className="thead">
                            <tr>
                                <th id="first-collun">Id</th>
                                <th id="other-collun">Name</th>
                                <th id="other-collun">Amount</th>
                                <th id="other-collun">Price</th>
                                <th id="other-collun">Category</th>
                                <th id="other-collun">Options</th>
                            </tr>
                        </thead>
                        <tbody className="tbody" id="home-tbody">
                           {carts == null ? null
                           //Map para renderizar o carrinho
                            :carts.map((cart) =>{
                                let totalAmount = parseInt(cart.amount);
                                totalAmount + 2
                                
                                if (specialCharsRegex.test(cart.product)) {
                                    return;
                                }
                                return(
                                    <tr>
                                        <td id='first-collun'>{cart.productcode}</td>
                                        <td id="other-collun">{cart.product}</td>
                                        <td className="number-input" id="other-collun">
                                            <button onClick={
                                                //Arrow function para diminuir o valor do input em 1
                                                (e) =>{
                                                        let inp = e.target.parentElement.querySelector(".quantity");
                                                        if (inp.value > 1) {
                                                            inp.value = parseInt(inp.value) - 1;
                                                        }

                                                    GetCartsAmounts(e)
                                                } 
                                            }>-</button>
                                                <input className="quantity" min="1" max={totalAmount} name="quantity" defaultValue={cart.amount} type="number" id="getCartAmount" />
                                            <button onClick={
                                                //Arrow function para aumentar o valor do input em 1
                                                (e)=>{
                                                    let inp = e.target.parentElement.querySelector(".quantity");
                                                        if(inp.value >= parseInt(cart.totalAmount)){
                                                            inp.value = parseInt(cart.totalAmount) -1;
                                                        }
                                                        inp.value = parseInt(inp.value) + 1
                                                    GetCartsAmounts(e)
                                                }
                                            }>+</button>
                                        </td>
                                        <td id="other-collun">{cart.price}</td>
                                        <td id="other-collun">{cart.category}</td>
                                        
                                        <td id="other-collun"><button className='del-btn' 
                                        //Arrow function para deletar o produto clicado do carrinho
                                            onClick={() => {
                                                let carts = JSON.parse(localStorage.getItem('carts'));
                                                let code = cart.productcode;
                                                let newCarts = carts.filter(cart => cart.productcode !== code);
                                                localStorage.setItem("carts", JSON.stringify(newCarts));
                                                RenderCarts()  
                                            }}
                                        >Delete</button></td>
                                    </tr>
                                )}) }
                        </tbody>
                    </table>
                    <div className="others" id="others">
                        <div className="number-container">Tax: R$<div id="tax">{tax}</div>
                        </div>
                        <div className="number-container">Total price: R$<div id="total" className='total'>{total}</div>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className="table-cancel-btn" onClick={
                            //Arrow function para excluir o carrinho
                            ()=>{
                                localStorage.removeItem('carts');
                                location.reload()
                            }
                        }>Cancel</button>
                        <button className="table-finish-btn" onClick={Finish}>Finish</button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;