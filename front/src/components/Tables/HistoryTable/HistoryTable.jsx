/* eslint-disable react/prop-types */
export default function HistoryTable({historyItem, ViewProducts}) {
    return(
        <tr key={historyItem.code}>
            <td id="first-collun">{historyItem.code}</td>
            <td id="other-collun">R$ {historyItem.tax}</td>
            <td id="other-collun">R$ {historyItem.total}</td>
            <td id="other-collun"><button className="view-btn" onClick={(e) => {ViewProducts(e)}}>View</button></td>
        </tr>
    )
}