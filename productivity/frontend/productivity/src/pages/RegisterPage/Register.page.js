import AuthContainer from '../../components/styled/AuthContainer.Styled';
import {
    Login,
    Register
} from '../../components/';

function RegisterPage(){

    console.log('inside login page');
    return(
        <AuthContainer>
            <Register />
        </AuthContainer>
    )
}


export default RegisterPage;