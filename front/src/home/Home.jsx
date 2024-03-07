/* eslint-disable react/jsx-key */

import './Home.css'

export default function Home() {
    function renderCards() {
        let card = document.getElementById("card-container");
        fetch("http://localhost/routes/products.php?action=get",).then(response => response.json()).then((data) => {
            data.forEach(product => {
                    let div = document.createElement("div");
                    div.innerHTML =
                        `
                        <p> ${product.productcode}</p>
                        <p> ${product.productname}</p>
                        <p>${product.amount}</p>
                        <p>R$ ${product.price}</p>
                        <p>${product.categoryname}</p>
                        <p> ${product.tax}</p>
                        <p><button class="btn" onClick="addToCart()">Add</button></p>
                        `
                    card.append(div);
            })
        })
    }
    renderCards()
    fetch("http://localhost/routes/categories.php?action=get",).then(response => response.json()).then((data) => {
        let tbody = document.getElementById('categories-tbody');
        if(data) {
            data.forEach(category => {
                var specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;
                if (specialCharsRegex.test(category.name)) {
                    return;
                }
                let trow = document.createElement('tr');
                trow.innerHTML = `
                <td id="first-collun">${category.code}</td>
                <td id="other-collun">${category.name}</td>
                <td id ="other-collun">${category.tax}%</td>
                <td id="other-collun" ><button class="del-btn" onClick="location.href='http://localhost/routes/categories.php?action=delete&code=${category.code}'">Delete</button></td>
                `
                tbody.appendChild(trow)
            })
        }
    });
    function letExecute() {
            console.log("aqui")
    }
    return(
        <div className="container">
            <div className="left-container">
                <div className="sub-container">
                <div id="card-container"></div>
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

                        </tbody>
                    </table>
                    <div className="others" id="others">
                        <div className="number-container">Tax: R$<div id="tax"></div>
                        </div>
                        <div className="number-container">Total price: R$<div id="total"></div>
                        </div>
                    </div>
                    <div>
                        <button onClick="Cancel()" className="table-cancel-btn">Cancel</button>
                        <button onClick={letExecute()} className="table-finish-btn">Finish</button>
                    </div>
                </div>
            </div>
        </div>
       
    )
}