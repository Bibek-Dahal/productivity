import React from 'react';
import { AuthContext } from '../Contexts/index';

const useAuthContext = () => React.useContext(AuthContext);

export default useAuthContext;