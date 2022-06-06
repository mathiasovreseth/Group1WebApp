import React, {CSSProperties} from 'react';
import styled from "styled-components";


const TextButtonStyle = styled.button`
  border-radius: 0;
  background: inherit;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: ${props => `${props.theme.fontSizes.medium}`};

`
interface TextButtonProps {
    label: string;
    onClick: () => void;
    style?: CSSProperties;
}

function TextButton(props: TextButtonProps) {
    return <TextButtonStyle style={props.style} onClick={props.onClick}>
        {props.label}
    </TextButtonStyle>
}

export default TextButton;