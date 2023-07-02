import { toast } from "react-toastify"

export const sendEmail = async (data) => {
    fetch('/api/contact',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }).then((response) => {
        if (response) {
            toast.success("Email sent successfully!!")
        } 
    }).catch((error) => {
        toast.error(error)
    })
}