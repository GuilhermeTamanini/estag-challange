import { Route, Routes, BrowserRouter} from "react-router-dom"
import { isAuthenticated } from "../auth";

//componentes
import Categories from "../categories/Categories"
import History from "../history/History";
import Home from "../home/Home";
import Products from "../products/Products"
import Purchase from "../purchase/Purchase";
import Login from "../login/Login";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route Component = { Home } path="/"/>
                {isAuthenticated() == false || isAuthenticated() == true ?
                <Route Component = { History } path="/history" />
                :null}
                {isAuthenticated() == null ?
                <Route Component = { Login } path="/login" exact />
                :null}
                {isAuthenticated() == true ?
                <Route Component = { Categories } path="/categories"/>
                :null}
                {isAuthenticated() == true ?
                <Route Component = { Products } path="/products" />
                :null}
                {isAuthenticated() == false || isAuthenticated() == true ?
                <Route Component = { Purchase } path="/purchase" />
                :null}      
            </Routes>
        </BrowserRouter>
    )
}

export default Router;