import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService
} from "../../services/userService"
import { toast } from 'react-toastify';


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                // console.log("getstate",getState);
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetgenderstart error", error);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                // console.log("getstate",getState);
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetgenderstart error", error);
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetgenderstart error", error);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log("check create user", res);
            if (res && res.errCode === 0) {
                toast.success("😼Create a new user is succed!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed())
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error", error);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed())
                toast.error("😼Create a new user is error!");
            }
        } catch (error) {
            toast.error("😼Fetch all user is error!");
            dispatch(fetchAllUsersFailed());
            console.log("fetchAllUsersFailed error", error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            console.log("check create user", res);
            if (res && res.errCode === 0) {
                toast.success("😼Delete user is succed!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailed())
                toast.error("😼Delete user is error!");
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed error", error);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})