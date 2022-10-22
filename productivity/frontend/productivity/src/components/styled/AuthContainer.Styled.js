import styled from 'styled-components';
import authBg from '../../svgs/authBg.svg';

const AuthContainer = styled.div`
    height:100vh;
    width:100vw;
    background:url(${authBg}) no-repeat;
    background-size:cover;
    background-position:center left;
    display:grid;
    place-items:center;
`

export default AuthContainer;