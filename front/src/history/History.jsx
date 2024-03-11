/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import './History.css'

export default function History() {
    const [history, setHistory] = useState([])
    const [products, setProducts] = useState([])    

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
                {history == null ? null
                    :history.map(historyItem => {
                        return(
                            <tr>
                                <td id="first-collun">{historyItem.code}</td>
                                <td id="other-collun">R$ {historyItem.tax}</td>
                                <td id="other-collun">R$ {historyItem.total}</td>
                                <td id="other-collun"><button className="view-btn" onClick={(e) => {ViewProducts(e)}}>View</button></td>
                            </tr>
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
                            {products == null ? null
                            :products.map((product) => {
                                return(
                                    <tr>
                                        <td id="first-collun">{product.code}</td>
                                        <td id="other-collun">{product.name}</td>
                                        <td id="other-collun">{product[3]}</td>
                                        <td id="other-collun">R$ {product.price}</td>
                                        <td id="other-collun">{product.tax}%</td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="total"></div>
        </div>
    )
}