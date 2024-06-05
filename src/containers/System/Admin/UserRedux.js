import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from "../../../services/userService"
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
        }
    }

    async componentDidMount() {
        this.props.getGenderStart(); //this.props.dispatch(actions.getGenderStart())

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
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr
        let language = this.props.language
        console.log("check props from redux",this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    Huong dep trai lam User Redux Admin
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'> <FormattedMessage id="manage-user.add" /> </div>
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
                                    {positions && positions.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" />: </label>
                                <select className='form-control'>
                                    {roles && roles.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" />: </label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-12 mt-3'>
                                <button className='btn btn-primary'>
                                    <FormattedMessage id="manage-user.save" />
                                </button></div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
