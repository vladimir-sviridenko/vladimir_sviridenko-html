class Day {
  private date: Date;
  private isInMonth: boolean;
  private isToday: boolean;
  private shiftMonthEvent: CustomEvent<Date>;

  constructor(date: Date, isInMonth: boolean = false, isToday: boolean = false) {
    this.date = date;
    this.isInMonth = isInMonth;
    this.isToday = isToday;
    this.shiftMonthEvent = new CustomEvent("dayClick", {
      detail: this.date,
      bubbles: true
    });
  }

  render() {
    const dayElement = document.createElement("button");
    dayElement.className = "calendar__day-button";
    dayElement.textContent = this.date.getDate().toString();

    dayElement.onclick = () => {
      dayElement.dispatchEvent(this.shiftMonthEvent);
    }
    
    if (!this.isInMonth) {
      dayElement.classList.add("calendar__day-button_out-month");
    }

    if(this.isToday) {
      dayElement.classList.add("calendar__day-button_today");
    }

    return dayElement;
  }
}

export default Day;