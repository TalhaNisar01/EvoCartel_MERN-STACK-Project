
import './index.css'
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect,useState } from 'react';
import summaryApi from './common/index'
import Context from './context/index';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './store/userSlice';


function App() {


  const [cartProductCount,setCartProductCount] = useState(0)

  const dispatch =useDispatch()
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.current_user.url,{
       method:summaryApi.current_user.method,
       credentials:"include"
    })
    
    const dataApi=await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("User Details:",dataResponse)
  }



  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(summaryApi.addToCartProductCount.url,{
      method : summaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }



  useEffect(()=>{
    fetchUserDetails()


    fetchUserAddToCart()
  },[])

  return (
    <>
    <Context.Provider value={{
        fetchUserDetails , //fetching user details
        cartProductCount,
        fetchUserAddToCart
    }}>
    <Header />
    <main className='min-h-[calc(100vh-110px)] pt-20'>
      <Outlet />
    </main>
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
