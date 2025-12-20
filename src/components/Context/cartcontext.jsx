
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CartContect = createContext();

export default function CartContectProvider(props) {





    const [cart, setcart] = useState();
 
   

    function AddProudctToCart(productId) {

        if (localStorage.getItem('usertoken') !== null) {

            return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    productId: productId
                },
                {
                    headers: {
                        token: localStorage.getItem('usertoken')
                    }
                })
                .then((response) => response)
                .catch((error) => error)


        }


    }

    function updateuserCart(productId, count) {



        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                count: count
            },
            {
                headers: {
                    token: localStorage.getItem('usertoken')
                }
            })
            .then((response) => response)
            .catch((error) => error)

    }
    function GetLogedUserCart() {

        if (localStorage.getItem('usertoken') !== null) {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: {
                        token: localStorage.getItem('usertoken')
                    }
                })
                .then((response) => response)
                .catch((error) => error)

        }



    }
    function deleteuseritemCart(productId) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers: {
                    token: localStorage.getItem('usertoken')
                }
            })
            .then((response) => response)
            .catch((error) => error)

    }
    function ClearCart() {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: {
                    token: localStorage.getItem('usertoken')
                }
            })
            .then((response) => response)
            .catch((error) => error)

    }
    async function getCart() {

        let response = await GetLogedUserCart();
        setcart(response?.data)



    }
    useEffect(() => {
        getCart()
     
    }, []);




    return <CartContect.Provider value={{ AddProudctToCart, GetLogedUserCart, updateuserCart, deleteuseritemCart, ClearCart, cart, setcart }}>

        {props.children}

    </CartContect.Provider>

}