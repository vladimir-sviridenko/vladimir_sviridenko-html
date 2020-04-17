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
    const animationClass = "calendar__carousel_animated";
    let shiftClass: string;
    let addElementFunction: Function;
    let shiftNewMonth: number;
    let elementToRemove: Node;

    if (isShiftingToPrevious) {
      shiftClass = "calendar__carousel_shift_right";
      elementToRemove = monthWrap.lastChild;
      addElementFunction = HTMLElement.prototype.prepend.bind(monthWrap);
      shiftNewMonth = -1;
    } else {
      shiftClass = "calendar__carousel_shift_left";
      elementToRemove = monthWrap.firstChild;
      addElementFunction =  HTMLElement.prototype.append.bind(monthWrap);
      shiftNewMonth = 1;
    }

    this.style.pointerEvents = "none";
    monthWrap.classList.add(animationClass);
    monthWrap.classList.add(shiftClass);
    monthWrap.ontransitionend = (event: Event) => {
      monthWrap.classList.remove(animationClass);
      addElementFunction(this.generateMonth(shiftNewMonth));
      monthWrap.removeChild(elementToRemove);
      monthWrap.classList.remove(shiftClass);
      this.removeAttribute("style");
    };
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