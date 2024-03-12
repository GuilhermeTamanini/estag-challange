/* eslint-disable react/jsx-key */
import {useState, useEffect} from 'react'

import CategoriesTable from '../components/Tables/CategoriesTable/CategoriesTable';
import './Categories.css'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const specialCharsRegex = /[!@#$%^&*()_{}[\]:;<>,.?~]/;

    useEffect(() =>  {
        fetch('http://localhost/routes/categories.php?action=get')
        .then(response => response.json())
        .then(data => {
            setCategories(data)
        })
        .catch(error => console.log(error +"An error ocurred when fetching categories!"))
    }, [])

    return(
        <div className="container">
            <div className="left-container">
                <form action="http://localhost/routes/categories.php?action=post" method="POST">
                    <div>
                        <input type="text" name="name" className="input" id="category-input" placeholder="Category name"
                            pattern="[a-zA-Z0-9]+" title="Apenas letras e números!" maxLength="100" required />
                    </div>
                    <div>
                        <input type="number" name="tax" className="input" id="tax-input" placeholder="Tax quantity"
                            pattern="[0-9]+" title="Apenas números!" min="1" maxLength="4" required />
                    </div>
                    <button type="submit" name="addC-button" className="add-btn">Add category</button>
                </form>
            </div>
            <div className="right-container">
                <div className="table-wrapper">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th id="first-collun">Id</th>
                                <th id="other-collun">Category</th>
                                <th id="other-collun">Tax</th>
                                <th id="other-collun">Options</th>
                            </tr>
                        </thead>
                        <tbody className="tbody" id="categories-tbody">
                            {//Map para renderizar a table de categorias
                            categories === null ? null :categories.map((category) => {
                                if (specialCharsRegex.test(category.name)) {
                                    return;
                                }
                                return(
                                    <CategoriesTable category={category}/>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
