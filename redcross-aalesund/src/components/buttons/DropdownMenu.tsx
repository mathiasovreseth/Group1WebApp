import React, {Ref} from 'react';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import styled from "styled-components";
import {FaBars} from 'react-icons/fa';
import {SmallText} from "../../styles/CommonStyles";


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
                <DropdownItem>
                    <SmallText>About us</SmallText>
                </DropdownItem>
                <DropdownItem>
                    <SmallText>Community</SmallText>
                </DropdownItem>
                <DropdownItem>
                    <SmallText>Company</SmallText>
                </DropdownItem>
            </DropdownItemGroup>
        </DropdownMenu>
    )
}

export default MyDropDownMenu;