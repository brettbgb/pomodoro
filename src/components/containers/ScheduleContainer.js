// src/components/containers/ScheduleContainer.js

class ScheduleContainer extends React.Component {  
  ...
  render() {
    return (
      < DayPicker
        locale='us'
        selectedDays={day => {
         DateUtils.isSameDay(new Date())
        }} />
      < AttendanceRecordShow 
        day={we need to give it a day!} 
        student={we need to give it a student!} 
        record={we need to give it a record!}/> 

    )
}   