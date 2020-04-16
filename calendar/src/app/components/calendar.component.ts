import Month from "./month.component";

class Calendar extends HTMLTimeElement {
  private todaysDate: Date;
  private monthShift: number;

  constructor() {
    super();
    this.todaysDate = new Date();
    this.monthShift = 0;
    this.className = "calendar";
    this.initializeEvents();
    this.initializeDateTimeAttribute();
  }

  private initializeEvents() {
    this.addEventListener("onDayClick", function(event) {
      const clickedDate = event.detail.date;
      const doShift = !event.detail.isInMonth;
      const currentDate = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift);
      if(clickedDate < currentDate && doShift) {
        this.shift(true);
      } else if(clickedDate > currentDate && doShift) {
        this.shift(false);
      }
    });
    
  }

  private shift(isShiftingToPrevious: boolean) {
    if(isShiftingToPrevious) {
      this.monthShift--;
    } else {
      this.monthShift++;
    }

    const newDateLabel = this.generateTodaysDateLabel();
    const oldDateLabel = this.querySelector(".calendar__date-label");
    oldDateLabel.replaceWith(newDateLabel);

    const monthWrap = this.querySelector(".calendar__month-wrap");
    const newMonth = this.generateMonth();
    const currentMonth = monthWrap.querySelector(".calendar__month");
    if(isShiftingToPrevious) {
      newMonth.classList.add("calendar__month_shift-left");
      monthWrap.prepend(newMonth);
      currentMonth.classList.add("calendar__month_no-animation");
      currentMonth.classList.add("calendar__month_shift-left");
      setTimeout(()=>{
        newMonth.classList.remove("calendar__month_shift-left");
        currentMonth.classList.remove("calendar__month_no-animation");
        currentMonth.classList.remove("calendar__month_shift-left");
      }, 0);
      currentMonth.ontransitionend = (event: Event) => {
        const currentMonth = event.currentTarget;
        currentMonth.parentNode.removeChild(currentMonth);
      }
    } else {
      currentMonth.classList.add("calendar__month_shift-left");
      monthWrap.appendChild(newMonth);
      setTimeout(()=>{
        newMonth.classList.add("calendar__month_shift-left");
      }, 0);
      currentMonth.ontransitionend = (event: Event) => {
        const currentMonth = event.currentTarget;
        const newMonth = currentMonth.nextSibling;
        newMonth.classList.add("calendar__month_no-animation");
        newMonth.classList.remove("calendar__month_shift-left");
        currentMonth.parentNode.removeChild(currentMonth);
        newMonth.classList.remove("calendar__month_no-animation");
      }
    }
  }

  private initializeDateTimeAttribute() {
    const year = this.todaysDate.getFullYear();
    const month = (this.todaysDate.getMonth() + 1);
    const date = this.todaysDate.getDate();

    const monthFormatted = (month >= 10) ? month : ("0" + month);
    const dateFormatted = (date >= 10) ? date : ("0" + date);

    this.dateTime = `${year}-${monthFormatted}-${dateFormatted}`;
  }

  public connectedCallback() {
    this.update();
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

  private update() {
    this.innerHTML = "";
    const controlPanelWrap = document.createElement("div");
    controlPanelWrap.className = "calendar__control-panel-wrap";
    controlPanelWrap.appendChild(this.generateTodaysDateLabel());
    controlPanelWrap.appendChild(new ControlPanel().render());
    const monthWrap = document.createElement("div");
    monthWrap.className = "calendar__month-wrap";
    monthWrap.appendChild(this.generateMonth());
    this.appendChild(controlPanelWrap);
    this.appendChild(monthWrap);
  }
}

export default Calendar;