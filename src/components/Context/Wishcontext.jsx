
import axios from 'axios';
import { createContext, useState, useEffect } from 'react'


export let Wishcontext = createContext();



export default function Wishcontextprovider(props) {

  const [Wishcount, setWishCount] = useState();

  function GetLoggedWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem('usertoken')
      }
    })
      .then((res) => {
          setWishCount(res?.data?.data?.length);
          return res

      })
      .catch((err) => err )

  }

  
  useEffect(() => {

    GetLoggedWishList()
   


  }, []);


  return (
    <Wishcontext.Provider value={{ GetLoggedWishList, Wishcount, setWishCount }}>
      {props.children}
    </Wishcontext.Provider>
  )
}

