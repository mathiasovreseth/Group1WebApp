import React, {Ref} from 'react';
import DropdownMenu, {DropdownItem, DropdownItemGroup} from "@atlaskit/dropdown-menu";
import styled from "styled-components";
import { FaBars } from 'react-icons/fa';
const DropdownMenuItem = styled.p`
    font-size: 1.6rem;
`;

const MenuButton = styled.button `
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


/// make this more reusable
function MyDropDownMenu() {
    return (
        <DropdownMenu
            trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
                <MenuButton
                    style={{fontSize: '3rem'}}
                    type="button"
                    {...providedProps}
                    ref={triggerRef as Ref<HTMLButtonElement>}
                >
                    <FaBars />
                </MenuButton>
            )}
        >
            <DropdownItemGroup css={{fontSize: '1.6rem'}} >
                <DropdownItem css={{fontSize: '1.6rem'}}>
                    <DropdownMenuItem>About us</DropdownMenuItem>
                </DropdownItem>
                <DropdownItem>
                    <DropdownMenuItem>Community</DropdownMenuItem>
                </DropdownItem>
                <DropdownItem>
                    <DropdownMenuItem>Company</DropdownMenuItem>
                </DropdownItem>
            </DropdownItemGroup>
        </DropdownMenu>
    )
}
export default MyDropDownMenu;