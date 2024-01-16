import React from 'react';
import '../index.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    this.state = {
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
    };
  }

  renderHeader() {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    return (
      <div className="header">
        <button onClick={this.prevMonth}>Previous</button>
        <h2>{`${monthNames[this.state.currentMonth]} ${this.state.currentYear}`}</h2>
        <button onClick={this.nextMonth}>Next</button>
      </div>
    );
  }

  renderDays() {
    const firstDay = new Date(this.state.currentYear, this.state.currentMonth, 1);
    const lastDay = new Date(this.state.currentYear, this.state.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={i} className="day">
          {i}
        </div>
      );
    }

    return days;
  }

  prevMonth = () => {
    this.setState((prevState) => ({
      currentMonth: (prevState.currentMonth - 1 + 12) % 12,
      currentYear: prevState.currentMonth === 0 ? prevState.currentYear - 1 : prevState.currentYear,
    }));
  }

  nextMonth = () => {
    this.setState((prevState) => ({
      currentMonth: (prevState.currentMonth + 1) % 12,
      currentYear: prevState.currentMonth === 11 ? prevState.currentYear + 1 : prevState.currentYear,
    }));
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        <div className="days">
          {this.renderDays()}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
