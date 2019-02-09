import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import logginMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  students: [],
  selectedStudent: {},
  showStudent: false,
};

//ACTION TYPES
export const GET_STUDENTS = 'GET_STUDENTS';
export const SELECT_STUDENT = 'SELECT_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const SHOW_STUDENT = 'SHOW_STUDENT';

//ACTION CREATORS
export const getStudents = students => ({
  type: GET_STUDENTS,
  students,
});

export const selectStudent = student => ({
  type: SELECT_STUDENT,
  student,
});

export const addStudent = newStudent => ({
  type: ADD_STUDENT,
  newStudent,
});

export const showStudent = () => ({
  type: SHOW_STUDENT,
});

//THUNK CREATORS

export const fetchStudents = () => async dispatch => {
  try {
    const response = await axios.get('/student');
    const students = response.data;
    dispatch(getStudents(students));
  } catch (err) {
    console.error(err);
  }
};

export const postStudent = newStudentData => async dispatch => {
  try {
    const { data } = await axios.post('/student', newStudentData);
    dispatch(addStudent(data));
  } catch (err) {
    console.error(err);
  }
};

//REDUCER
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.students,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.newStudent],
      };
    case SELECT_STUDENT:
      return {
        ...state,
        selectedStudent: action.student,
      };
    case SHOW_STUDENT:
      return {
        ...state,
        showStudent: !state.showStudent,
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(logginMiddleware, thunkMiddleware)
);
