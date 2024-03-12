import { useState } from 'react';

import PurchasesTable from '../components/Tables/PurchasesTable/PurchasesTable';
import './Purchase.css'

export default function Purchase() {
    const [carts] = useState(JSON.parse(localStorage.getItem('carts')) || []);
    const [totals] = useState(JSON.parse(localStorage.getItem("totals")) || []); 
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
    
    //Função para deletar a order criada e remocer o totals do localStorage
    function Deny() {
        localStorage.removeItem("totals")
        location.href=`http://localhost/routes/orders.php?action=del`;
    }

    //Função para postar as cada produto do carrinho
    function Accept() {
        let carts = JSON.parse(localStorage.getItem('carts'));
        carts.forEach(cart => {
            fetch('http://localhost/routes/orders.php?action=get')
                .then(response => response.json())
                .then((data) => {
                    data.forEach(order => {
                        let data = new FormData();
                        data.append("productCode", JSON.stringify(cart.productcode));
                        data.append("orderCode", JSON.stringify(order.max));
                        data.append("amount", JSON.stringify(parseInt(cart.amount)));
                        data.append("price", JSON.stringify(parseFloat(cart.price)));
                        data.append("tax", JSON.stringify(parseFloat(cart.tax)));
                        
                        fetch('http://localhost/routes/orders.php?action=postorder',{
                            method: "POST",
                            body: data,
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
                            {//map para renderizar a table de compra
                            carts == null ? null : carts.map((cart) =>{
                                let totalAmount = parseInt(cart.amount);
                                if (specialCharsRegex.test(cart.product)) {
                                    return;
                                }
                                return(
                                    <PurchasesTable key={cart.productcode} cart={cart} totalAmount={totalAmount}/>
                                )}
                                ) 
                            }
                        </tbody>
                    </table>
                        {//Map para renderizar o valor total do preço e da taxa
                        totals.map((get) => {
                            return(
                                <div className="others" id="others" key={"Totals"}>
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