define("app/day/day.component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Day {
        constructor(date, isInMonth = true) {
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
    exports.default = Day;
});
define("app/shared/WeekDayNames", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const WeekDayNames = {
        RU: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        EN: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };
    Object.freeze(WeekDayNames);
    exports.default = WeekDayNames;
});
define("app/month/month.component", ["require", "exports", "app/day/day.component", "app/shared/WeekDayNames"], function (require, exports, day_component_1, WeekDayNames_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Month {
        constructor(todaysDate, monthShift) {
            this.todaysDate = todaysDate;
            this.monthShift = monthShift;
        }
        generateWeekDayLabels() {
            const weekDayLabels = [];
            for (let i = 0; i <= 6; i++) {
                const weekDayLabel = document.createElement("span");
                weekDayLabel.textContent = WeekDayNames_1.default.RU[i];
                weekDayLabel.className = "calendar__weekday-label";
                weekDayLabels.push(weekDayLabel);
            }
            return weekDayLabels;
        }
        generateDays() {
            const getWeekDay = (date) => {
                let weekDay = date.getDay();
                return weekDay ? weekDay : 7;
            };
            const generatePreviousMonthDays = () => {
                let monthsDaysQuantity = this.getLastDayOfMonth(currentYear, shownMonth - 1);
                const monthsLastMondayDate = monthsDaysQuantity - getWeekDay(new Date(currentYear, shownMonth, 1)) + 2;
                for (let i = monthsLastMondayDate; i <= monthsDaysQuantity; i++) {
                    const date = new Date(currentYear, shownMonth - 1, i);
                    const day = new day_component_1.default(date, false).render();
                    dayElements.push(day);
                }
            };
            const generateCurrentMonthDays = () => {
                for (let i = 1; i <= daysQuantity; i++) {
                    const date = new Date(currentYear, shownMonth, i);
                    const day = new day_component_1.default(date).render();
                    dayElements.push(day);
                }
            };
            const generateNextMonthDays = () => {
                const lastWeekDay = getWeekDay(new Date(currentYear, shownMonth, daysQuantity));
                for (let i = 1; i <= 7 - lastWeekDay; i++) {
                    const date = new Date(currentYear, shownMonth + 1, i);
                    const day = new day_component_1.default(date, false).render();
                    dayElements.push(day);
                }
            };
            const dayElements = [];
            const currentYear = this.todaysDate.getFullYear();
            const shownMonth = this.todaysDate.getMonth() + this.monthShift;
            generatePreviousMonthDays();
            const daysQuantity = this.getLastDayOfMonth(currentYear, shownMonth);
            generateCurrentMonthDays();
            generateNextMonthDays();
            return dayElements;
        }
        getLastDayOfMonth(year, month) {
            const date = new Date(year, month + 1, 0);
            return date.getDate();
        }
        render() {
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
    exports.default = Month;
});
define("app/calendar/calendar.component", ["require", "exports", "app/month/month.component"], function (require, exports, month_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Calendar extends HTMLTimeElement {
        constructor() {
            super();
            this.todaysDate = new Date();
            this.monthShift = 0;
            this.className = "calendar";
        }
        connectedCallback() {
            this.render();
            this.updateDateTime();
        }
        updateDateTime() {
            const year = this.todaysDate.getFullYear();
            const month = (this.todaysDate.getMonth() + 1);
            const date = this.todaysDate.getDate();
            const monthFormatted = (month >= 10) ? month : ("0" + month);
            const dateFormatted = (date >= 10) ? date : ("0" + date);
            this.dateTime = `${year}-${monthFormatted}-${dateFormatted}`;
        }
        generateTodaysDateLabel() {
            const currentDateLabel = document.createElement("div");
            currentDateLabel.className = "calendar__date-label";
            const shiftedMonth = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getMonth();
            const shiftedYear = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getFullYear();
            currentDateLabel.textContent = MonthsNames.RU[shiftedMonth] + ", " + shiftedYear;
            return currentDateLabel;
        }
        generateMonth() {
            const shownMonthElement = new month_component_1.default(this.todaysDate, this.monthShift).render();
            shownMonthElement.className = "calendar__month";
            return shownMonthElement;
        }
        render() {
            this.appendChild(this.generateTodaysDateLabel());
            this.appendChild(this.generateMonth());
        }
    }
    exports.default = Calendar;
});
define("app/app.component", ["require", "exports", "app/calendar/calendar.component"], function (require, exports, calendar_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appTag = "app-calendar";
    function Init() {
        customElements.define(appTag, calendar_component_1.default, { extends: "time" });
        return appTag;
    }
    exports.default = Init;
});
define("main", ["require", "exports", "app/app.component"], function (require, exports, app_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const appTag = app_component_1.default();
    const app = document.createElement("time", { is: appTag });
    document.body.appendChild(app);
});
const MonthsNames = {
    RU: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
