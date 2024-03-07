import { Route, Routes, BrowserRouter} from "react-router-dom"

import Categories from "../categories/Categories"
import History from "../history/History";
import Home from "../home/Home"
import Products from "../products/Products"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component = { Categories } path="/categories"/>
                <Route Component = { History } path="/history" />
                <Route Component = { Home } path="/" exact/>
                <Route Component = { Products } path="/products" />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;