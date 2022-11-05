import React from 'react';
import About from '../pages/About/About';
import Services from '../pages/Services/Services';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Services></Services>
        </div>
    );
};

export default Home;