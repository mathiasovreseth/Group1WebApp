import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider} from "styled-components";
import {FlexColumnContainer, FlexContainer, LargeText, MediumText } from '../styles/CommonStyles';

import TextButton from '../components/buttons/TextButton';
import UserSectionAdminPage from "../components/AdminSections/userSectionAdminPage/UserSectionAdminPage";
import {FaBars} from 'react-icons/fa';
import ProductSectionAdminPage from "../components/AdminSections/productSectionAdminPage/ProductSectionAdminPage";


const OuterContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin-top: 8rem;
`;

const TextButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

function AdminPage() {
    const [index, setIndex] = useState<any>(0)
    return (
        <OuterContainer>

            <TextButtonsContainer>
                <TextButton style={{color: index == 0 ? "#D52B1E": "inherit"}} onClick={()=> setIndex(0)} label={"Users"}/>
                <TextButton style={{margin: "0 8rem", color: index == 1 ? "#D52B1E": "inherit"}} onClick={()=> setIndex(1)} label={"Products"}/>
                <TextButton style={{color: index == 2 ? "#D52B1E": "inherit"}} onClick={()=> setIndex(2)} label={"Orders"}/>
            </TextButtonsContainer>
            {index == 0 &&
                <UserSectionAdminPage/>
            }
            {index == 1 &&
                <ProductSectionAdminPage/>
            }
        </OuterContainer>
    );
}

export default AdminPage;