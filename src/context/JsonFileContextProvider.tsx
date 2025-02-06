import  { useState } from "react"
import JsonFileContext from "./JsonFileContext"

const JsonFileContextProvider = ({children}:{children:React.ReactNode}) => {
  
    const [jsonFile, setJsonFile] = useState([])

    return (
    <JsonFileContext.Provider value={{jsonFile, setJsonFile}}>
    {children}
    </JsonFileContext.Provider>
  )
}

export default JsonFileContextProvider
