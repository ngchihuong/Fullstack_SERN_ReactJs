import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService"
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderStart(); //this.props.dispatch(actions.getGenderStart())
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     let res2 = await getAllCodeService('role')
        //     let res3 = await getAllCodeService('position')
        //     // console.log("res2", res2);
        //     if (res && res.errCode === 0) {
        //         // console.log("res", res);
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     if (res2 && res2.errCode === 0) {
        //         this.setState({
        //             roleArr: res2.data
        //         })
        //     }
        //     if (res3 && res3.errCode === 0) {
        //         this.setState({
        //             positionArr: res3.data
        //         })
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }
    handleOnchangImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
            console.log("check file 0", objectUrl);
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr
        let language = this.props.language

        let isGetGenders = this.props.isLoadingGender
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    Huong dep trai lam User Redux Admin
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add" /> </div>
                            <div className='col-12'>{isGetGenders ? 'Loading genders' : ''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /> : </label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /> : </label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" />: </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" />: </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" />: </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" />: </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" />: </label>
                                <select className='form-control'>
                                    {genders && genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" />: </label>
                                <select className='form-control'>
                                    {positions && positions.length > 0
                                        && positions.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" />: </label>
                                <select className='form-control'>
                                    {roles && roles.length > 0
                                        && roles.map((item, index) => {
                                            return (
                                                <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" />: </label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangImage(event)}
                                    />
                                    <label className='label-upload'
                                        htmlFor='previewImg'>Tải ảnh
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}>
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'>
                                    <FormattedMessage id="manage-user.save" />
                                </button></div>

                        </div>
                    </div>
                    {this.state.isOpen &&

                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }


                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
