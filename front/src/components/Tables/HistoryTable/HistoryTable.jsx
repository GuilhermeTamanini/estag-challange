/* eslint-disable react/prop-types */
export default function HistoryTable({historyItem}) {
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
        <tr key={historyItem.code}>
            <td id="first-collun">{historyItem.code}</td>
            <td id="other-collun">R$ {historyItem.tax}</td>
            <td id="other-collun">R$ {historyItem.total}</td>
            <td id="other-collun"><button className="view-btn" onClick={(e) => {ViewProducts(e)}}>View</button></td>
        </tr>
    )
}