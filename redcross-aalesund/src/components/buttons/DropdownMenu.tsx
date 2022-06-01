import React, {Ref} from 'react';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import styled from "styled-components";
import {FaBars} from 'react-icons/fa';
import {SmallText} from "../../styles/CommonStyles";
import { Link } from 'react-router-dom';


const MenuButton = styled.button`
  border-radius: 0;
  background: inherit;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

// interface MenuProps {
// menuOptions: Array<String>;
// }



function MyDropDownMenu() {
    return (
        <DropdownMenu
            trigger={({triggerRef, isSelected, testId, ...providedProps}) => (
                <MenuButton
                    style={{fontSize: '3rem'}}
                    type="button"
                    {...providedProps}
                    ref={triggerRef as Ref<HTMLButtonElement>}
                >
                    <FaBars/>
                </MenuButton>
            )}
        >
            <DropdownItemGroup>
                <Link to={'/about'}>
                <DropdownItem>
                    <SmallText>About us</SmallText>
                </DropdownItem>
                </Link>
                <Link to={'/community'}>
                <DropdownItem>
                    <SmallText>Community</SmallText>
                </DropdownItem>
                </Link>
                <Link to={'/company'}>
                <DropdownItem>
                    <SmallText>Company</SmallText>
                </DropdownItem>
                </Link>
            </DropdownItemGroup>
        </DropdownMenu>
    )
}

export default MyDropDownMenu;