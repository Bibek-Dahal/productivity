import AuthContainer from '../../components/styled/AuthContainer.Styled';
import {
    Login
} from '../../components/';

function LoginPage(){

    console.log('inside login page');
    return(
        <AuthContainer>
            <Login />
        </AuthContainer>
    )
}


export default LoginPage;