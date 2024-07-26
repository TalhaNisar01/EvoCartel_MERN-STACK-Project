import React from 'react';
import CategoryList from '../components/categoryList';
import HorizontalCardProduct from '../components/HorizontalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <HorizontalCardProduct category={"refrigerator"} heading={"Popular Refrigertor's Collection "}/>

      <HorizontalCardProduct category={"mobiles"} heading={"Branded Mobiles"}/>
       
      <HorizontalCardProduct category={"airpodes"} heading={"Branded AirPodes"}/>
      <HorizontalCardProduct category={"Mouse"} heading={"Branded Mouse"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Branded EarPhones"}/>

      <HorizontalCardProduct category={"camera"} heading={"Branded Camera"}/>

      <HorizontalCardProduct category={"printers"} heading={"Branded Printer"}/>
      <HorizontalCardProduct category={"processor"} heading={"Branded Processor"}/>
      <HorizontalCardProduct category={"speakers"} heading={"Branded Speakers"}/>
      <HorizontalCardProduct category={"trimmers"} heading={"Branded Trimmers"}/>

      <HorizontalCardProduct category={"televisions"} heading={"Branded Television"}/>
      <HorizontalCardProduct category={"watches"} heading={"Branded Watches"}/>
      <HorizontalCardProduct category={"shirts"} heading={"Branded Shirts"}/>
    </div>
  );
};

export default Home;
