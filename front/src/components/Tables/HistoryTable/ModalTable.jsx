/* eslint-disable react/prop-types */
export default function Modaltable({product}) {
    return (
        <tr key={product.productcode}>
            <td id="first-collun">{product.code}</td>
            <td id="other-collun">{product.name}</td>
            <td id="other-collun">{product[3]}</td>
            <td id="other-collun">R$ {product.price}</td>
            <td id="other-collun">{product.tax}%</td>
        </tr>
    )
}