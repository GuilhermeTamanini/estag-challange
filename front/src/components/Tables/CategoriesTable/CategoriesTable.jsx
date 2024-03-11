/* eslint-disable react/prop-types */

export default function CategoriesTable({category}) {
    return(
        <tr>
            <td id="first-collun">{category?.code}</td>
            <td id="other-collun">{category?.name}</td>
            <td id="other-collun">{category?.tax}</td>
            <td id="other-collun" >
                <button className="del-btn" onClick={() =>{location.href=`http://localhost/routes/categories.php?action=delete&code=${category.code}`}}>Delete</button>
            </td>
        </tr>
    )
}