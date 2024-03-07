/* eslint-disable react/jsx-key */

import './History.css'

export default function History() {
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
        
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="total"></div>
        </div>
    )
}