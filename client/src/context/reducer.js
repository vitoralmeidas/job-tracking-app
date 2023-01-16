import { initialState } from './appContext'
import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  HANDLE_CHANGE,
  LOGOUT_USER,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_EDIT_JOB,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS
} from './actions'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!'
    }
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...'
    }
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      alertText: action.payload.msg,
      showAlert: true,
      isLoading: false
    }
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: '',
      jobLocation: ''
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
      user: action.payload.user,
      toke: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      alertType: 'danger',
      isLoading: false,
      alertText: action.payload.msg,
      showAlert: true
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
  }

  if (action.type === CLEAR_VALUES) {
    const initialStateJob = {
      isEditing: false,
      editJob: '',
      position: '',
      company: '',
      jobType: 'full-time',
      status: 'pending',
      jobLocation: state.userLocation
    }
    return {
      ...state,
      ...initialStateJob
    }
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true }
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job created!'
    }
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
      isLoading: false
    }
  }

  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      totalOfPages: action.payload.totalOfPages
    }
  }

  if (action.type === SET_EDIT_JOB) {
    // find the job
    const job = state.jobs.find(job => job._id === action.payload.id)
    const { _id, company, position, jobLocation, jobType, status } = job

    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      jobLocation,
      jobType,
      company,
      status
    }
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Job Updated'
    }
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  throw new Error(`no such action :${action.type}`)
}

export default reducer
