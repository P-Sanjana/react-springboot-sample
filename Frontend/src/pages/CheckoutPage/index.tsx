import React from 'react';
import Footer from '../../components/molecules/Footer';
import CheckoutComponent from '../../components/organisms/Checkout';
import Header from '../../components/organisms/Header';
import SideNavBar from '../../components/organisms/SideNavBar/SideNavBar';
import BasicTemplate from '../../components/templates/BasicTemplate';
import { dashboardpage } from '../../utils/constants';

const CheckoutPage=()=>{
  return (
    <BasicTemplate 
    sideNav={<SideNavBar />} 
    header={<Header title="Dashboard" avatarPicUrl={dashboardpage[0]}
    avatarPicAlt="pic"
    />} 
    
    footer={<Footer />} 
    
    body={<CheckoutComponent total="0.0234510 BTC" process='buy'/>}
      />
  )
}

export default CheckoutPage;
