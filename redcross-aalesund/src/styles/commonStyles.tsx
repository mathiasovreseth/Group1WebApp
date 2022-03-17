import styled from "styled-components";

// place common styles here. Like a button style we are going to use multible places. or different text styles we use often.


export const FlexContainer = styled.div`
    display: flex;
`;
export const FlexColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const XSmallText = styled.text`
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
`;
export const SmallText = styled.text`
    font-size: ${props => `${props.theme.fontSizes.small}`};
`;
export const MediumText = styled.text`
    font-size: ${props => `${props.theme.fontSizes.medium}`};
`;
export const LargeText = styled.text`
    font-size: ${props => `${props.theme.fontSizes.large}`};
`;
export const xLargeText = styled.text`
    font-size: ${props => `${props.theme.fontSizes.xLarge}`};
`;

