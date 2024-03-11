import { useState, useEffect } from 'react'

import HistoryTable from '../components/Tables/HistoryTables/HistoryTable'
import Modaltable from '../components/Tables/HistoryTables/ModalTable'
import './History.css'

export default function History() {
    const [history, setHistory] = useState([])
    const [products, setProducts] = useState([])    
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;

    useEffect(() =>  {
        fetch('http://localhost/routes/products.php?action=get', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(data => {
            setProducts(data)
        })
        .catch(error => console.log(error))
    }, [])

    useEffect(() =>  {
        fetch('http://localhost/routes/orders.php?action=getall')
        .then(response => response.json())
        .then(data => {
            setHistory(data)
        })
        .catch(error => console.log(error))
    }, [])

    function ViewProducts(e) {
        var button = e.target.parentElement.parentElement;
        var code = button.children[0].innerText;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        window.onclick = function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        modal.style.display = "block";

        fetch(`http://localhost/routes/orders.php?action=getdetail&code=${code}`)
            .then(response => response.json())
            .then((data) => {setProducts(data)})
    }

    return(
        <div>
            <table className="table" id="table">
                <thead className="thead">
                    <tr>
                        <th id="first-collun">Code</th>
                        <th id="other-collun">Total tax</th>
                        <th id="other-collun">Total</th>
                        <th id="other-collun">Options</th>
                    </tr>
                </thead>
                <tbody id="tbody" className="tbody">
                {history == null ? null :history.map(historyItem => {
                    return(
                        <HistoryTable key={historyItem.code} historyItem={historyItem} ViewProducts={ViewProducts}/>
                    )
                })}
                </tbody>
            </table>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <table>
                        <thead>
                            <th id="first-collun">Code</th>
                            <th id="other-collun">Product</th>
                            <th id="other-collun">Amount</th>
                            <th id="other-collun">Unit Price</th>
                            <th id="other-collun">Tax</th>
                        </thead>
                        <tbody id="modal-tbody">
                            {products == null ? null :products.map((product) => {
                                if (specialCharsRegex.test(product.name)) {
                                    return;
                                }
                                return(
                                    <Modaltable key={product.code} product={product}/>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="total"></div>
        </div>
    )
}