import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { customerListRequest } from "../../reducers";

const Customers = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(customerListRequest())
    },[])

    return (
        <>
            Customer Table
        </>
    )
}

export default Customers;