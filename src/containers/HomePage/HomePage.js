import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
        };
        return (
            <div>
                <HomeHeader></HomeHeader>
                <Specialty settings = {settings}></Specialty>
                <MedicalFacility settings = {settings}></MedicalFacility>
                <OutStandingDoctor settings={settings}></OutStandingDoctor>
                <HandBook settings={settings}></HandBook>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);