import React, {useEffect, useState} from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from "./styles/Theme";
import LandingPage from "./pages/LandingPage";
import {Route, Routes} from 'react-router-dom';
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./pages/RegistrationPage";
import {RequireAdminAuth, RequireAuth, useAuth} from "./auth/Auth";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from './pages/ProductPage';
import AskQuestion from './pages/Questions';
import Terms from './pages/terms';
import Refunds from './pages/Refunds';
import Ethics from './pages/Ethics';
import {productsApiResponse} from "./models/ProductsModel";
import ShoppingCartPage from "./pages/shoppingCartPage/ShoppingCartPage";

export default function App() {
   const auth = useAuth();
    let [shoppingCartItem, setShoppingCartItem] = useState("");

    useEffect(()=> {
        let temp = localStorage.getItem("p");
        if(temp) {
            setShoppingCartItem(temp);
        }
    }, [])
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles/>
            {/*wait for the authProvider to check if the user is authenticated or not*/}
            {auth.isAuthenticated != null &&
                <>
                    <Header shoppingCartItem={shoppingCartItem}/>
                    <Routes>
                        <Route path={"/"} element={<LandingPage/>}/>
                        <Route path={"*"} element={<LandingPage/>}/>
                        {/*example route that need authentication*/}
                        <Route
                            path="/admin"
                            element={
                                <RequireAdminAuth>
                                    <AdminPage/>
                                </RequireAdminAuth>
                            }
                        />
                        <Route path={"/terms-of-service"} element={<TermsOfServicePage/>}/>
                        <Route path={"/about"} element={ <AboutPage/>}/>
                        <Route path={"/privacy-policy"} element={<PrivacyPolicyPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/registration"} element={<RegistrationPage/>}/>
                        <Route path={"/product-page"} element={<ProductPage/>}/>
                        <Route path={"/questions"} element={<AskQuestion/>}/>
                        <Route path={"/terms"} element={<Terms/>}/>
                        <Route path={"/Refunds"} element={<Refunds/>}/>
                        <Route path={"/Ethics"} element={<Ethics/>}/>
                        <Route path={"/shopping-cart"} element={<ShoppingCartPage product={null}/>}/>
                    </Routes>
                    <Footer/>

                </>
            }


        </ThemeProvider>

    );
}










