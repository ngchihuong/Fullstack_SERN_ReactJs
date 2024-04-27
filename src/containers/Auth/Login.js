import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { handleLoginApi } from "../../services/userService";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.btnLogin = React.createRef();
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errorCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errorCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("Login Success!")
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log("err", e.response);

        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
        console.log(this.state.isShowPassword);
    }
    render() {

        return (
            <div className="login-background">
                <div className='login-block'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>Username</label>
                                <input
                                    placeholder='Enter your username...'
                                    type='text' className='form-control'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)} />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <div className='custom-input-password'>
                                    <input
                                        placeholder='Enter your password...'
                                        type={this.state.isShowPassword ? "text" : "password"} className='form-control'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangePassword(event)} />
                                    <span onClick={() => this.handleShowHidePassword()}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className='col-12'>
                                <button className=' btn-login'
                                    onClick={() => this.handleLogin()}
                                >Login</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password?</span>
                            </div>
                            <div className='col-12 text-center mt-3'>
                                <span className='text-other-login'>Or login with: </span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
