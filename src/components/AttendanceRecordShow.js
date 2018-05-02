import React from 'react';  
import DayPicker, { DateUtils } from 'react-day-picker'  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as attendanceRecordActions from '../../actions/attendanceRecordActions';

class ScheduleContainer extends React.Component {  
  componentDidMount() {
    if (this.props.attendanceRecords.length = = 0) {
      this.props.actions.fetchAttendanceRecords();
    }
  }

  render() {
    return (
      < DayPicker
        locale='us'
        selectedDays={day => {
         DateUtils.isSameDay(new Date())
        }} /> 
    )
  }
}

function mapStateToProps(state, ownProps) {  
  return {attendanceRecords: state.attendanceRecords}
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(attendanceRecordActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);