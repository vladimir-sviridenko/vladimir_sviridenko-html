class Day {
  private date: Date;
  private isInMonth: boolean;

  constructor(date: Date, isInMonth: boolean = true) {
    this.date = date;
    this.isInMonth = isInMonth;
  }

  render() {
    const dayElement = document.createElement("button");
    dayElement.textContent = this.date.getDate().toString();
    dayElement.className = "calendar__day";

    if (!this.isInMonth) {
      dayElement.classList.add("calendar__day_out-month");
    }

    return dayElement;
  }
}

export default Day;