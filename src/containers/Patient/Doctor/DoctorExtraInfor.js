import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss"
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,

        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleShowHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { language } = this.props;
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>địa chỉ phòng khám</div>
                    <div className='name-clinic'>phòng khám chuyên khoa da liễu</div>
                    <div className='detail-address'>207 phố huế - hai bà trưng - hà nội</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            giá khám: 250.000Đ.
                            <span onClick={() => this.handleShowHideDetailInfor(true)}> Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>giá khám</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>250.000đ</span>
                                </div>
                                <div className='note'>
                                    được ưu tiên khi đặt qua app Booking. giá khám cho người mới 250.000đ</div>
                            </div>
                            <div className='payment'>người bệnh có thể thanh toán chi phí bằng tiền mặt</div>
                            <div className='hide-price'>
                                <span onClick={() => this.handleShowHideDetailInfor(false)}>ẩn bảng giá</span>
                            </div>
                        </>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
