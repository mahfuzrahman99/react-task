import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const StateContext = createContext();

const StateProvider = ({children}) => {

    const [todos, setTodos] = useState([])
    // console.log(todos)

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("info")) || []);
    },[])


    const stateInfo = {
        todos,
        setTodos,

      };

    return (
        <StateContext.Provider value={stateInfo}>{children}</StateContext.Provider>
    );
};

export default StateProvider;