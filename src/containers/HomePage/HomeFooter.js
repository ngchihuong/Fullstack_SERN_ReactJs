import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {


    render() {
        return (
            <div className='home-footer'>
               <p>&copy; 2024 Nguyễn Chí Hướng code with Eric.More infomation, please visit my facebook by"Hướng đẹp trai"! 
                 <a target='_blank' href='https://www.facebook.com/ngchihuong.dzai'> &#8594;Click here &#8592;</a></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
