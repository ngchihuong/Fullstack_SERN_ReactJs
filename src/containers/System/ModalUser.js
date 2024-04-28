import { ModalBody, ModalFooter, ModalHeader, Button, Modal } from "reactstrap";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter()
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    } // emitter event :v

    componentDidMount() {
        console.log('mouting modal');
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnchangeInput = (event, id) => {
        //bad code
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log("bad state", this.state);
        // })
        //good code
        //nên copy ra một obj-arr mới rồi mới setState để ko phải duyệt lại nhiều giúp tối ưu hiệu năng
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        console.log("coppy state", copyState);

        console.log(event.target.value, id);
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log("check inside loop: ", this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i])
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api create modal
            this.props.createNewUser(this.state)

        }
        // console.log("data model", this.state);
    }
    render() {
        // console.log("check props", this.props);
        // console.log("check modal props", this.props.isOpen);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg" centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email:</label>
                            <input
                                type="email"
                                onChange={(event) => this.handleOnchangeInput(event, "email")}
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password:</label>
                            <input
                                type="password"
                                onChange={(event) => this.handleOnchangeInput(event, "password")}
                                value={this.state.password} />
                        </div>

                        <div className="input-container">
                            <label>First Name:</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnchangeInput(event, "firstName")}
                                value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnchangeInput(event, "lastName")}
                                value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address:</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnchangeInput(event, "address")}
                                value={this.state.address} />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary" className="px-3"
                        onClick={() => { this.handleAddNewUser() }}>Add new</Button>
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
