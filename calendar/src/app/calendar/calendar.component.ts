import Month from "../month/month.component";

class Calendar extends HTMLTimeElement {
  private todaysDate: Date;
  private monthShift: number;

  constructor() {
    super();
    this.todaysDate = new Date();
    this.monthShift = 0;
    this.className = "calendar";
  }

  public connectedCallback() {
    this.render();
    this.updateDateTime();
  }

  private updateDateTime() {
    const year = this.todaysDate.getFullYear();
    const month = (this.todaysDate.getMonth() + 1);
    const date = this.todaysDate.getDate();

    const monthFormatted = (month >= 10) ? month : ("0" + month);
    const dateFormatted = (date >= 10) ? date : ("0" + date);

    this.dateTime = `${year}-${monthFormatted}-${dateFormatted}`;
  }

  private generateTodaysDateLabel(): HTMLDivElement {
    const currentDateLabel = document.createElement("div");
    currentDateLabel.className = "calendar__date-label";
    const shiftedMonth = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getMonth();
    const shiftedYear = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getFullYear();
    currentDateLabel.textContent = MonthsNames.RU[shiftedMonth] + ", " + shiftedYear;
    return currentDateLabel;
  }

  private generateMonth(): HTMLDivElement {
    const shownMonthElement = new Month(this.todaysDate, this.monthShift).render();
    shownMonthElement.className = "calendar__month";
    return shownMonthElement;
  }

  private render() {
    this.appendChild(this.generateTodaysDateLabel());
    this.appendChild(this.generateMonth());
  }
}

export default Calendar;