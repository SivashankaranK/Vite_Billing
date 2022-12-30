import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getCustomerList } from "../../reducer";

const Customers = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCustomerList(22))
    },[])

    return (
        <>
            Customer Table
        </>
    )
}

export default Customers;