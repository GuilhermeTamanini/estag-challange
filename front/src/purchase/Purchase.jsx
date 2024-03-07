/* eslint-disable react/jsx-key */

import './Purchase.css'

export default function Purchase() {
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
                    <tbody className="tbody" id="tbody">
                    </tbody>
                </table>
                <div className="others">
                    <div className="number-container">Tax: R$<div id="tax"></div>
                    </div>
                    <div className="number-container">Total price: R$<div id="total"></div>
                    </div>
                </div>
                <div>
                    <h1>Finalizar a compra?</h1>
                </div>
                <button className="table-cancel-btn" onClick="Deny()">Não</button>
                <button className="table-finish-btn" id="fim" onClick="Accept()">Sim</button>
            </div>
        </div>
    )
}