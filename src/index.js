import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

let data = [{index:1, description:"mow the lawn", isSelected:false, isCompleted:false},{index:2, description:"get a job", isSelected:false, isCompleted:false}];


class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }
  render() {
    return (
      <div className="pomodoro">
        <div className="main-page">
          <MainPage data={data}/>
        </div>
      </div>
    );
  }
}
  

class ToDoList extends React.Component {
  
    constructor(props){
        super(props);

        this.state = {
            data: props.data
        };
    }
    addMore = () => {
        const data = this.state.data;
        var addToDoText = document.getElementsByClassName("add-todo-text");
        let index = data.length + 1;
        
        // clear current selected item
        this.state.data.forEach(function (value) {
           value.isSelected = false;
        });
        
        let newItem = {index: index, description: addToDoText[0].value, isSelected: true};
        data.push(newItem);
        addToDoText[0].value = "";

        // will automatically call render method after update 
        this.setState({data});
    }

    clearRows() {
        // clear current selected item
        data.forEach(function (value) {
           value.isSelected = false;
        });
    }

    listRowClick = (selectedIndex) => {

        this.clearRows();

        // select the current row
        data[selectedIndex-1].isSelected = true;
        this.setState({data});
    }

    render() {
        let data = this.state.data;
        return (
            <div>Task List
              <ul className="todo-list">
                  {data.map(i => <li 
                                   className={i.isSelected ? 'selected' : ''} 
                                   onClick={() => this.listRowClick(i.index)}
                                   key={i.index}>
                                   <input className="check-item" type='checkbox' /> {i.description}
                                 </li>)}        
              </ul>
              <input type="text" className="add-todo-text" />
              
              <button onClick={this.addMore}>Add</button>
            </div>
        );
    }
}

class Timer extends React.Component {    

  componentWillUnmount() {
      clearInterval(this.timer);
  }
  
  constructor() {
    super();   
    this.timer = 0;
    this.breakCount = 1;
    this.hadBigBreak = false;
    this.state = { time: {}, seconds: 1500 };
    this.startTimer = this.startTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
  }

  componentDidMount() {
     this.resetTime();
  }

  resetTime() {
    clearInterval(this.timer);
    this.timer = 0;
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }
  startTimer() {
    if (this.timer == 0) {
      this.resetTime();
      this.timer = setInterval(this.displayTime, 1000);
    }
  }

  displayTime() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    }); 
    if (seconds == 0) { 
      clearInterval(this.timer);
      if ( this.breakCount <= 4) {
          alert("It's time for your break # " + this.breakCount + " now! Click OK to continue working" + this.timer);
          this.timer = 0;
          this.setState({seconds :0, minutes :0});
          this.startTimer();
      } else if ( ! this.hadBigBreak ) {        
          alert("It's time for your 30 minute break now! Click OK to continue working");
          this.hadBigBreak = true;
          this.startTimer();
      } else {
          alert("You have spent the maximum time allowed on this task. Closing task...");
      }
      this.breakCount++;
    }
  }
  
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));   
    let divisorforminutes = secs % (60 * 60);
    let divisorforseconds = divisorforminutes % 60;
    let minutes = Math.floor(divisorforminutes / 60);

    let seconds = Math.ceil(divisorforseconds);

    let returnValue = {
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    };
    return returnValue;
  }
  
  render() {
    return(
        <div>
          <a className="timer-link" href="#" onClick={this.startTimer}>
            Start Timer
          </a>
          <span className="time-remaining">time remaining: </span>
          <div className="time-display">
            minutes: {this.state.time.minutes} seconds: {this.state.time.seconds}
          </div>
      </div>
    );
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {

    return (
      <div>
        <div className="timer">
          <Timer />
        </div>
        <div className="todo-container">
          <ToDoList data={data}/>
        </div>
      </div>
    );
  }
}



ReactDOM.render(
  <Pomodoro data={data}/>,
  document.getElementById('root')
);
