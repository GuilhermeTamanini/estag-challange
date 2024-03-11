/* eslint-disable react/jsx-key */
import './Card.css'
import Card from '../components/Card/Card';
import HomeTable from '../components/Tables/HomeTable/HomeTable';
import { useEffect, useState } from 'react'

function Home() {
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('carts')) || []);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;

    //busca os produtos
    useEffect (() => {
       fetch("http://localhost/routes/products.php?action=get")
       .then(response => response.json())
       .then(data => setProducts(data))
       .catch(error => console.log(error + "An error ocurred when fetching products!"))
    },[])

    useEffect (() => {
        setCarts(JSON.parse(localStorage.getItem('carts')) || [])
    }, [carts,products])
    
    //Busca a taxa total e o  preço total
    useEffect (() => {
        getTotal()
    }, [carts])
    
    // //Função que cria o preço total e a taxa total
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
                        {products == null ? null :products.map((product) => {
                            if (specialCharsRegex.test(product.productname)) {
                                return;
                            }
                            if(product.amount == 0) {
                             return;
                            }
                            return(
                                 <Card product={product}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="right-container">  
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

                            if (specialCharsRegex.test(cart.product)) {
                                return;
                            }
                            return(
                                <HomeTable cart={cart} totalAmount={totalAmount} />
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
        
        
    )
}

export default Home;