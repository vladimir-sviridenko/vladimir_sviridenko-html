import Day from "./day.component";
import WeekDayNames from "../shared/WeekDayNames";

class Month {
  private todaysDate: Date;
  private monthShift: number;

  constructor(todaysDate: Date, monthShift: number) {
    this.todaysDate = todaysDate;
    this.monthShift = monthShift;
  }

  private generateWeekDayLabels(): HTMLDivElement[] {
    const weekDayLabels = [];

    for (let i = 0; i <= 6; i++) {
      const weekDayLabel = document.createElement("div");
      weekDayLabel.textContent = WeekDayNames.RU[i];
      weekDayLabel.className = "calendar__weekday-label";
      weekDayLabels.push(weekDayLabel);
    }
    return weekDayLabels;
  }

  private generateDays(): HTMLButtonElement[] {

    const isToday = (date: Date) => {
      if(date.getFullYear() === this.todaysDate.getFullYear() &&
      date.getMonth() === this.todaysDate.getMonth() &&
      date.getDate() === this.todaysDate.getDate()) {
        return true;
      } 
      return false;
    }

    const getWeekDay = (date: Date) => {
      let weekDay = date.getDay();
      return weekDay ? weekDay : 7;
    }

    const generatePreviousMonthDays = () => {
      let monthsDaysQuantity = this.getLastDayOfMonth(currentYear, shownMonth - 1);
      const monthsLastMondayDate = monthsDaysQuantity - getWeekDay(new Date(currentYear, shownMonth, 1)) + 2;
      for (let i = monthsLastMondayDate; i <= monthsDaysQuantity; i++) {
        const date = new Date(currentYear, shownMonth - 1, i);
        const day = new Day(date).render();
        dayElements.push(day);
      }
    }

    const generateCurrentMonthDays = () => {
      for (let i = 1; i <= daysQuantity; i++) {
        const date = new Date(currentYear, shownMonth, i);
        const day = new Day(date, true, isToday(date)).render();
        dayElements.push(day);
      }
    }

    const generateNextMonthDays = () => {
      const lastWeekDay = getWeekDay(new Date(currentYear, shownMonth, daysQuantity));
      for (let i = 1; i <= 7 - lastWeekDay; i++) {
        const date = new Date(currentYear, shownMonth + 1, i);
        const day = new Day(date).render();
        dayElements.push(day);
      }
    }

    const dayElements: HTMLButtonElement[] = [];
    const currentYear = this.todaysDate.getFullYear();
    const shownMonth = this.todaysDate.getMonth() + this.monthShift;

    generatePreviousMonthDays();
    const daysQuantity = this.getLastDayOfMonth(currentYear, shownMonth);
    generateCurrentMonthDays();
    generateNextMonthDays();

    return dayElements;
  }

  private getLastDayOfMonth(year: number, month: number) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  public render() {
    const monthElement = document.createElement("div");
    monthElement.className = "calendar__month";

    this.generateWeekDayLabels().forEach((weekDay) => {
      monthElement.appendChild(weekDay);
    });

    this.generateDays().forEach((dayElement) => {
      monthElement.appendChild(dayElement);
    });

    return monthElement;
  }
}

export default Month;