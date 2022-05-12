import React from 'react';
import {LargeText, MediumText, SmallText} from "../styles/CommonStyles";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    padding: 10rem 0;
    
`
const TextContainer = styled.div`
  width: 70vh;
  border-radius: ${props => `${props.theme.borderRadius}`};
  box-shadow: 0 0 2rem 0 rgba(90, 90, 90);
  padding: 2rem 4.4rem 6.6rem 4.4rem;
  
`
function TermsOfServicePage() {
    return(
        <Container>
            <TextContainer>
                <LargeText style={{marginBottom: "2rem"}}>Terms of Service</LargeText>
                <MediumText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer condimentum nisi tristique eros aliquet interdum. Vestibulum ultrices diam pretium tempus luctus. In vehicula quis quam at vehicula. Sed at luctus libero. Nullam scelerisque augue in leo congue, vel rutrum purus tempor. Maecenas augue magna, scelerisque condimentum metus quis, tempor suscipit dolor. Maecenas et purus commodo, vestibulum sapien vitae, accumsan leo. Vivamus sit amet feugiat sem. Curabitur luctus in ligula fermentum condimentum. Nulla facilisi. Sed in odio felis. Ut consectetur erat vel neque interdum interdum. Duis ut odio at augue vestibulum congue. Proin eget viverra tellus, posuere faucibus ante.
                Vivamus tempor interdum nisi. In iaculis eros a lectus pretium scelerisque. Proin sed urna quis tortor cursus pretium. Etiam nisi nisl, dignissim faucibus nibh sit amet, fringilla iaculis eros. Praesent pellentesque ligula at sapien tristique, eu mollis magna commodo. Nullam luctus et diam ut pharetra. In hac habitasse platea dictumst. Curabitur consequat dictum dui, vel tempus neque maximus sit amet. Suspendisse venenatis, metus et iaculis volutpat, augue nulla pretium tortor, eget molestie magna mauris ullamcorper nulla. Donec tempus eros a leo interdum, commodo cursus orci blandit. Morbi orci eros, sollicitudin vitae tincidunt id, tempor in orci. Aliquam placerat id orci sed posuere. Sed felis odio, ultricies quis scelerisque ac, tempor sed erat. Donec volutpat luctus odio eu iaculis. Maecenas consectetur varius tortor, nec blandit nisl mattis vel.
            </MediumText>
            </TextContainer>
        </Container>

    )
}

export default TermsOfServicePage;