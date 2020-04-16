import Month from "./month.component";

class Calendar extends HTMLTimeElement {
  private todaysDate: Date;
  private monthShift: number;

  constructor() {
    super();
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
    this.monthShift = 0;
    this.className = "calendar";
    this.initializeEvents();
    this.initializeDateTimeAttribute();
  }

  private initializeEvents() {
    this.addEventListener("dayMouseDown", function (event) {
      const clickedDate = event.detail.date;
      const doShift = !event.detail.isInMonth;
      const currentDate = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift);
      if (clickedDate < currentDate && doShift) {
        this.shift(true);
      } else if (clickedDate > currentDate && doShift) {
        this.shift(false);
      }
    });

    this.addEventListener("backClick", function () {
      this.shift(true);
    });
    this.addEventListener("nextClick", function () {
      this.shift(false);
    });
    this.addEventListener("toNowClick", function () {
      const months = this.querySelectorAll(".calendar__month");
      if (this.monthShift > 0) {
        this.monthShift = 0;
        months[0].replaceWith(this.generateMonth());
        this.shift(true, true);
        months[1].replaceWith(this.generateMonth(1));
      } else if (this.monthShift < 0) {
        this.monthShift = 0;
        months[2].replaceWith(this.generateMonth());
        this.shift(false, true);
        months[1].replaceWith(this.generateMonth(-1));
      }
    });
  }

  private shift(isShiftingToPrevious: boolean, isShiftToNow: boolean = false) {
    if (!isShiftToNow) {
      if (isShiftingToPrevious) {
        this.monthShift--;
      } else {
        this.monthShift++;
      }
    } else {
      this.monthShift = 0;
    }

    const newDateLabel = this.generateTodaysDateLabel();
    const oldDateLabel = this.querySelector(".calendar__date-label");
    oldDateLabel.replaceWith(newDateLabel);

    const monthWrap = this.querySelector(".calendar__carousel");
    this.style.pointerEvents = "none";
    if (isShiftingToPrevious) {
      monthWrap.classList.add("calendar__carousel_animated");
      monthWrap.classList.add("calendar__carousel_shift_right");
      monthWrap.ontransitionend = (event: Event) => {
        monthWrap.classList.remove("calendar__carousel_animated");
        monthWrap.removeChild(monthWrap.lastChild);
        monthWrap.prepend(this.generateMonth(-1));
        monthWrap.classList.remove("calendar__carousel_shift_right");
        this.removeAttribute("style");
      };
    } else {
      monthWrap.classList.add("calendar__carousel_animated");
      monthWrap.classList.add("calendar__carousel_shift_left");
      monthWrap.ontransitionend = (event: Event) => {
        monthWrap.classList.remove("calendar__carousel_animated");
        monthWrap.append(this.generateMonth(1));
        monthWrap.removeChild(monthWrap.firstChild);
        monthWrap.classList.remove("calendar__carousel_shift_left");
        this.removeAttribute("style");
      };
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

  private generateMonth(additionalShift: number = 0): HTMLDivElement {
    const shownMonthElement = new Month(this.todaysDate, this.monthShift + additionalShift).render();
    shownMonthElement.className = "calendar__month";
    return shownMonthElement;
  }

  private generateMonthCarousel(): HTMLDivElement {
    const monthWrap = document.createElement("div");
    monthWrap.className = "calendar__carousel";

    const previousMonth = this.generateMonth(-1);
    const currentMonth = this.generateMonth();
    const nextMonth = this.generateMonth(1);

    monthWrap.appendChild(previousMonth);
    monthWrap.appendChild(currentMonth);
    monthWrap.appendChild(nextMonth);
    return monthWrap;
  }

  private generateControlPanel(): HTMLDivElement {
    const controlPanel = document.createElement("div");
    controlPanel.className = "calendar__control-panel";
    controlPanel.appendChild(this.generateTodaysDateLabel());
    controlPanel.appendChild(new ControlPanel().render());
    return controlPanel;
  }

  private update() {
    this.innerHTML = "";
    this.appendChild(this.generateControlPanel());
    this.appendChild(this.generateMonthCarousel());
  }
}

export default Calendar;