import './Card.css'

export default function Card() {
    return(
        <div className="card-container" id="card-container">
            <div>
                <p> 1</p>
                <p> Produto</p>
                <p>20</p>
                <p>R$ 500</p>
                <p>Categoria1</p>
                <p> 99%</p>
                <p><button className="btn" onClick="addToCart()">Add</button></p>
            </div>
        </div>
    )
}
