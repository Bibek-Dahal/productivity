import React,
{
    createContext,
    useState
} from 'react';

export const GlobalControlContext = createContext();

export const GlobalControlProvider = ({children}) => {

    const [modalVisible,setModalVisible] = useState(0);

    const value = {
        modalVisible,
        setModalVisible
    }

    return(
        <GlobalControlContext.Provider
            value = {value}        
        >
            {children}
        </GlobalControlContext.Provider>
    )
}


