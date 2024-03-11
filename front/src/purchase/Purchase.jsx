/* eslint-disable react/jsx-key */
import { useState } from 'react';
import './Purchase.css'

export default function Purchase() {
    const [carts] = useState(JSON.parse(localStorage.getItem('carts')) || []);
    const [totals] = useState(JSON.parse(localStorage.getItem("totals")) || []); 
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
    
    function Deny() {
        fetch('http://localhost/routes/orders.php?action=get')
            .then(response => response.json())
            .then((data) => {
                data.forEach(code => {
                    console.log(data)
                    localStorage.removeItem("totals")
                    location.href=`http://localhost/routes/orders.php?action=del`;
                }) 
            })
    }
    function Accept() {
        let carts = JSON.parse(localStorage.getItem('carts'));
        carts.forEach(cart => {
            fetch('http://localhost/routes/orders.php?action=get')
                .then(response => response.json())
                .then((data) => {
                    data.forEach(order => {
                        $.ajax({
                            url: 'http://localhost/routes/orders.php?action=postorder',
                            type: 'POST',
                            data: {
                                productCode: JSON.stringify(parseInt(cart.productcode)),
                                orderCode: JSON.stringify(order.max),
                                amount: JSON.stringify(parseInt(cart.amount)),
                                price: JSON.stringify(parseFloat(cart.price)),
                                tax: JSON.stringify(parseFloat(cart.tax)),
                            },
                            success: function (data) {
                                console.log(data + "sucess")
                            }
                        })
                        location.href = `http://localhost/routes/orders.php?action=updateproduct&code=${cart.productcode}&amount=${cart.amount}`
                        localStorage.removeItem('carts');
                        localStorage.removeItem('totals')
                    })
                })
        })
    }

    return(
        <div className="container">
            <div className="table-container">
                    <table className="table" id="table">
                        <thead className="thead">
                            <tr>
                                <th id="first-collun">Id</th>
                                <th id="other-collun">Name</th>
                                <th id="other-collun">Amount</th>
                                <th id="other-collun">Price</th>
                                <th id="other-collun">Category</th>
                            </tr>
                        </thead>
                        <tbody className="tbody" id="home-tbody">
                           {//Map para renderizar o carrinho
                            carts.map((cart) =>{
                                let totalAmount = parseInt(cart.amount);
                                totalAmount + 2
                                
                                if (specialCharsRegex.test(cart.product)) {
                                    return;
                                }
                                return(
                                    <tr>
                                        <td id='first-collun'>{cart.productcode}</td>
                                        <td id="other-collun">{cart.product}</td>
                                        <td id="other-collun">{totalAmount}</td>
                                        <td id="other-collun">{cart.price}</td>
                                        <td id="other-collun">{cart.category}</td>
                                    </tr>
                                )}) }
                        </tbody>
                    </table>
                        {totals.map((get) => {
                            return(
                                <div className="others" id="others">
                                    <div className="number-container">Tax: R$<div id="tax">{get.totalTax}</div>
                                    </div>
                                    <div className="number-container">Total price: R$<div id="total" className='total'>{get.totalPrice}</div>
                                    </div>
                                </div>
                            )
                        })}
                    <div>
                        <h1>Finalizar a compra?</h1>
                    </div>
                    <div className="buttons">
                        <button className="table-cancel-btn" onClick={Deny}>Não</button>
                        <button className="table-finish-btn" id="fim" onClick={Accept}>Sim</button>
                    </div>
            </div>
            
        </div>
    )
}