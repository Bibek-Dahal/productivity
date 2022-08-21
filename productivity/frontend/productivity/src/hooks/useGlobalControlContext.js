import React,{
    useContext
} from 'react';

import {
    GlobalControlContext
} from '../Contexts/index';

const useGlobalControlContext = () => useContext(GlobalControlContext);


export default useGlobalControlContext;