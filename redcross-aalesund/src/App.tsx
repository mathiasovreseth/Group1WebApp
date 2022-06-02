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
                        <Route path={"/shopping-cart"} element={<ShoppingCartPage product={null}/>}/>
                    </Routes>
                    <Footer/>

                </>
            }


        </ThemeProvider>

    );
}










