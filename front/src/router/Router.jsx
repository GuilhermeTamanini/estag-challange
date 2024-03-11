import { Route, Routes, BrowserRouter} from "react-router-dom"

//componentes
import Categories from "../categories/Categories"
import History from "../history/History";
import Home from "../home/Home";
import Products from "../products/Products"
import Purchase from "../purchase/Purchase";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component = { Home } path="/" exact/>
                <Route Component = { Categories } path="/categories"/>
                <Route Component = { History } path="/history" />
                <Route Component = { Products } path="/products" />
                <Route Component = { Purchase } path="/purchase" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;