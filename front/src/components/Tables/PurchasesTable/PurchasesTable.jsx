/* eslint-disable react/prop-types */
export default function PurchasesTable({cart, totalAmount}){
    return(
        <tr>
            <td id='first-collun'>{cart.productcode}</td>
            <td id="other-collun">{cart.product}</td>
            <td id="other-collun">{totalAmount}</td>
            <td id="other-collun">{cart.price}</td>
            <td id="other-collun">{cart.category}</td>
        </tr>
    )
}