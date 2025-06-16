import { createContext, useState } from "react";


export const AppContext = createContext()

const AppContextProvider = (props)=>{

    const currencySymbol = '₹'
    const [loading, setLoading] = useState(false);

    
    const value = {
        currencySymbol,
        loading,setLoading
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider