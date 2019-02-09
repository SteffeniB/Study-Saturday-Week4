import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';
import { runInNewContext } from 'vm';
import {
  fetchStudents,
  postStudent,
  selectStudent,
  showStudent,
} from '../store';
import { connect } from 'react-redux';

class Main extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  render() {
    console.log('this is the state in main', this.state);
    return (
      <div>
        <h1>Students</h1>
        <button type="button" onClick={this.props.showStudentFunc}>
          Add Student
        </button>
        {this.props.showStudent ? (
          <NewStudentForm addStudent={this.props.addStudent} />
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.props.students}
            selectStudent={this.props.selectStudent}
          />
        </table>
        {this.props.selectedStudent.id ? (
          <SingleStudent student={this.props.selectedStudent} />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.students,
    selectedStudent: state.selectedStudent,
    showStudent: state.showStudent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    addStudent: studentData => dispatch(postStudent(studentData)),
    selectStudent: student => dispatch(selectStudent(student)),
    showStudentFunc: () => dispatch(showStudent()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
