/* eslint-disable react/prop-types */

export default function HomeTable({cart, totalAmount}) {

    //Função para mudar o amount no local storage conforme o valor do input muda
    function GetCartsAmounts(e) {
        let carts = JSON.parse(localStorage.getItem('carts'));
        let trow = e.target.parentElement.parentElement;
        let name = trow.children[1].innerText;
        let amount = trow.querySelector(".quantity").value;

        carts.forEach(cart => {
            if (cart.product == name) {
                cart.amount = parseInt(amount)
            }
        })
        localStorage.setItem('carts', JSON.stringify(carts));
    }

    return(
        <tr key={cart.productcode}>
            <td id='first-collun'>{cart.productcode}</td>
            <td id="other-collun">{cart.product}</td>
            <td className="number-input" id="other-collun">
                <button onClick={
                    //Arrow function para diminuir o valor do input em 1
                    (e) =>{
                        let inp = e.target.parentElement.querySelector(".quantity");
                        if (inp.value > 1) {
                            inp.value = parseInt(inp.value) - 1;
                        }
                        GetCartsAmounts(e)
                    } }>-</button>
                    <input className="quantity" min="1" max={totalAmount} name="quantity" defaultValue={cart.amount} type="number" id="getCartAmount" />
                <button onClick={
                    //Arrow function para aumentar o valor do input em 1
                    (e)=>{
                        let inp = e.target.parentElement.querySelector(".quantity");
                            if(inp.value >= parseInt(cart.totalAmount)){
                                inp.value = parseInt(cart.totalAmount) -1;
                            }
                            inp.value = parseInt(inp.value) + 1
                        GetCartsAmounts(e)
                    }}>+</button>
            </td>
            <td id="other-collun">{cart.price}</td>
            <td id="other-collun">{cart.category}</td>
                
            <td id="other-collun"><button className='del-btn' 
            //Arrow function para deletar o produto clicado do carrinho
                onClick={() => {
                    let carts = JSON.parse(localStorage.getItem('carts'));
                    let code = cart.productcode;
                    let newCarts = carts.filter(cart => cart.productcode !== code);
                    localStorage.setItem("carts", JSON.stringify(newCarts));
                }}
            >Delete</button></td>
        </tr>
    )
}