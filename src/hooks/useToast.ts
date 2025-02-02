import toast from "react-hot-toast"


const useToast = (message:string, success:boolean) => {
    if(success || success == undefined){
        toast.success(message, {
            duration:3000,
            position:"bottom-right",
            style: {
                background: "green",
                color: "#fff",          
                fontSize: "16px",       
                padding: "16px",        
                borderRadius: "8px",    
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
                letterSpacing:"0.1rem"
            },
        })
    }else{
        toast.error(message, {
            duration:3000,
            position:"bottom-right",
            style: {
                background: "red",
                color: "#fff",          
                fontSize: "16px",       
                padding: "16px",        
                borderRadius: "8px",    
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)", 
                letterSpacing:"0.1rem"
            },
        })
    }
}


export default useToast;