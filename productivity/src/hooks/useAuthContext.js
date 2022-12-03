import React from 'react';

import { AuthContext } from "../context/Auth.context";

const useAuthContext = () => React.useContext(AuthContext);

export default useAuthContext;