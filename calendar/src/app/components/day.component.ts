class Day {
  private date: Date;
  private isInMonth: boolean;
  private isToday: boolean;

  constructor(date: Date, isInMonth: boolean = false, isToday: boolean = false) {
    this.date = date;
    this.isInMonth = isInMonth;
    this.isToday = isToday;
  }

  render() {
    const dayElement = document.createElement("button");
    dayElement.className = "calendar__day-button";
    //  TODO remove hide datasets
    dayElement.dataset.day = this.date.getDate().toString();
    dayElement.dataset.month = (this.date.getMonth() + 1).toString();
    dayElement.dataset.year = this.date.getFullYear().toString();
    dayElement.textContent = dayElement.dataset.day;

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