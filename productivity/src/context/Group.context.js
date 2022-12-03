import React from "react"

export const GroupContext = React.createContext()

function GroupProvider({children}){
    const [groups,setGroups] = useState([])

    const getRandomColor = () => {
        const colors = ['red','green','blue'];
        return colors[Math.random() * (colors.length - 1 - 0) + 0]
    }

    
    const value = {
        groups,
        getRandomColor
    }

    return (
        <GroupContext.Provider
            value = {value}
        >
            {children}
        </GroupContext.Provider>
    )
}


export default GroupProvider;