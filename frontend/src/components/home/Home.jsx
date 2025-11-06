import React from 'react'
import HeroSection from './HeroSection'
import BenefitsSection from './BenefitsSection'
import Products from '../Products'
import OrganicBlends from './OrganicBlends'
import BestSellingProducts from './BestSellingProducts'
import BlackFridayOffer from './BlackFridayOffer'
import TrendingProducts from './TrendingProducts'
import Testimonial from './Testimonial'
import Boxes from './Boxes'
import OurBlog from './OurBlog'
import ExclusiveOffer from './ExclusiveOffer'
import Footer from '../Footer'
import NavOmKudrat from '../Navbar'
import NewProducts from './NewProducts'

const Home = () => {
    return (
        <>
            {/* <NavOmKudrat /> */}
            <HeroSection />
            <BenefitsSection />
            {/* <Products /> */}
            <NewProducts/>
            <OrganicBlends />
            <BestSellingProducts />
            <BlackFridayOffer overlay={true} />
            <TrendingProducts />
            <Testimonial />
            <Boxes />
            <OurBlog />
            <ExclusiveOffer />
            <Footer />
        </>
    )
}

export default Home