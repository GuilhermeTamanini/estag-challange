/* eslint-disable react/prop-types */

export default function ProductsTable({product}) {
    return(
        <tr key={product.productcode}>
            <td id='first-collun'>{product.productcode}</td>
            <td id="other-collun">{product.productname}</td>
            <td id="other-collun">{product.amount}</td>
            <td id="other-collun">
                <input type="number" name="" id="add-amount" className='edit-p'/>
                <button className='edit-btn'
                onClick={(e) => {   
                    let btn = e.target.parentElement
                    let inputValue = btn.children[0].value  
                    let newAmount = parseFloat(inputValue) + parseInt(product.amount);
                
                    if (inputValue <= 0) {
                        alert("O valor tem que ser maior que zero!");
                        return;
                    }
                    location.href = `http://localhost/routes/products.php?action=update&code=${product.productcode}&amount=${newAmount}`;
                }}
                >Edit
                </button>
            </td>
            <td id="other-collun">{product.price}</td>
            <td id="other-collun">{product.categoryname}</td>
            <td id="other-collun"><button className="del-btn" onClick={() =>{location.href=`http://localhost/routes/products.php?action=delete&code=${product.productcode}`}}>Delete</button></td>
        </tr>
    )
}