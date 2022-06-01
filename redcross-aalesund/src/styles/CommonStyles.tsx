import styled from "styled-components";

// place common styles here. Like a button style we are going to use multible places. or different text styles we use often.

export const FlexContainer = styled.div`
    display: flex;
`;
export const FlexColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// link tag without standard styles.
export const Li = styled.link`
  text-decoration: none;
  color: red;
`;

export const XSmallText = styled.p`
    font-size: ${props => `${props.theme.fontSizes.xSmall}`};
`;
export const SmallText = styled.p`
    font-size: ${props => `${props.theme.fontSizes.small}`};
`;
export const MediumText = styled.p`
    font-size: ${props => `${props.theme.fontSizes.medium}`};
`;
export const LargeText = styled.p`
    font-size: ${props => `${props.theme.fontSizes.large}`};
`;
export const xLargeText = styled.p`
    font-size: ${props => `${props.theme.fontSizes.xLarge}`};
`;
export const Input = styled.input`
    border-radius: ${props => `${props.theme.borderRadius}`};
    height: 4rem;
    margin-bottom: 0.8rem;
    padding: .25rem .25rem;
    font-size: ${props => `${props.theme.fontSizes.medium}`};;
`;
export const H1 = styled.h1`
    color: #d52d27;
    font-size: ${props => `${props.theme.fontSizes.header}`};
    font-weight: bold;
    margin: 2rem;
    @media screen and (max-width: ${props => `${props.theme.breakPoints.tabletLandScape}`}) {
        font-size: ${props => `${props.theme.fontSizes.xLarge}`};
    }
    text-align: center;
`;




