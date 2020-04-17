define("app/components/day.component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Day {
        constructor(date, isInMonth = false, isToday = false) {
            this.date = date;
            this.isInMonth = isInMonth;
            this.isToday = isToday;
            this.dayMouseDown = new CustomEvent("dayMouseDown", {
                detail: { date: this.date, isInMonth: this.isInMonth },
                bubbles: true
            });
        }
        render() {
            const dayElement = document.createElement("button");
            dayElement.className = "calendar__day-button";
            dayElement.textContent = this.date.getDate().toString();
            dayElement.onmousedown = (event) => {
                event.currentTarget.dispatchEvent(this.dayMouseDown);
            };
            if (!this.isInMonth) {
                dayElement.classList.add("calendar__day-button_out-month");
            }
            if (this.isToday) {
                dayElement.classList.add("calendar__day-button_today");
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
define("app/components/month.component", ["require", "exports", "app/components/day.component", "app/shared/WeekDayNames"], function (require, exports, day_component_1, WeekDayNames_1) {
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
                const weekDayLabel = document.createElement("div");
                weekDayLabel.textContent = WeekDayNames_1.default.RU[i];
                weekDayLabel.className = "calendar__weekday-label";
                weekDayLabels.push(weekDayLabel);
            }
            return weekDayLabels;
        }
        generateDays() {
            const isToday = (date) => {
                if (date.getFullYear() === this.todaysDate.getFullYear() &&
                    date.getMonth() === this.todaysDate.getMonth() &&
                    date.getDate() === this.todaysDate.getDate()) {
                    return true;
                }
                return false;
            };
            const getWeekDay = (date) => {
                let weekDay = date.getDay();
                return weekDay ? weekDay : 7;
            };
            const generatePreviousMonthDays = () => {
                let monthsDaysQuantity = this.getLastDayOfMonth(currentYear, shownMonth - 1);
                const monthsLastMondayDate = monthsDaysQuantity - getWeekDay(new Date(currentYear, shownMonth, 1)) + 2;
                for (let i = monthsLastMondayDate; i <= monthsDaysQuantity; i++) {
                    const date = new Date(currentYear, shownMonth - 1, i);
                    const day = new day_component_1.default(date).render();
                    dayElements.push(day);
                }
            };
            const generateCurrentMonthDays = () => {
                for (let i = 1; i <= daysQuantity; i++) {
                    const date = new Date(currentYear, shownMonth, i);
                    const day = new day_component_1.default(date, true, isToday(date)).render();
                    dayElements.push(day);
                }
            };
            const generateNextMonthDays = () => {
                let additionalDays = 0;
                if (dayElements.length <= 28) {
                    additionalDays = 14;
                }
                else if (dayElements.length <= 35) {
                    additionalDays = 7;
                }
                const lastWeekDay = getWeekDay(new Date(currentYear, shownMonth, daysQuantity));
                for (let i = 1; i <= 7 - lastWeekDay + additionalDays; i++) {
                    const date = new Date(currentYear, shownMonth + 1, i);
                    const day = new day_component_1.default(date).render();
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
define("app/components/calendar.component", ["require", "exports", "app/components/month.component"], function (require, exports, month_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Calendar extends HTMLTimeElement {
        constructor() {
            super();
            this.todaysDate = new Date();
            this.todaysDate.setHours(0, 0, 0, 0);
            this.monthShift = 0;
            this.className = "calendar";
            this.initializeEvents();
            this.initializeDateTimeAttribute();
        }
        initializeEvents() {
            this.addEventListener("dayMouseDown", function (event) {
                const clickedDate = event.detail.date;
                const doShift = !event.detail.isInMonth;
                const currentDate = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift);
                if (clickedDate < currentDate && doShift) {
                    this.shift(true);
                }
                else if (clickedDate > currentDate && doShift) {
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
                }
                else if (this.monthShift < 0) {
                    this.monthShift = 0;
                    months[2].replaceWith(this.generateMonth());
                    this.shift(false, true);
                    months[1].replaceWith(this.generateMonth(-1));
                }
            });
        }
        shift(isShiftingToPrevious, isShiftToNow = false) {
            if (!isShiftToNow) {
                if (isShiftingToPrevious) {
                    this.monthShift--;
                }
                else {
                    this.monthShift++;
                }
            }
            else {
                this.monthShift = 0;
            }
            const newDateLabel = this.generateTodaysDateLabel();
            const oldDateLabel = this.querySelector(".calendar__date-label");
            oldDateLabel.replaceWith(newDateLabel);
            const monthWrap = this.querySelector(".calendar__carousel");
            const animationClass = "calendar__carousel_animated";
            let shiftClass;
            let addElement;
            let shiftNewMonth;
            let elementToRemove;
            if (isShiftingToPrevious) {
                shiftClass = "calendar__carousel_shift_right";
                elementToRemove = monthWrap.lastChild;
                addElement = HTMLElement.prototype.prepend.bind(monthWrap);
                shiftNewMonth = -1;
            }
            else {
                shiftClass = "calendar__carousel_shift_left";
                elementToRemove = monthWrap.firstChild;
                addElement = HTMLElement.prototype.append.bind(monthWrap);
                shiftNewMonth = 1;
            }
            this.style.pointerEvents = "none";
            monthWrap.classList.add(animationClass);
            monthWrap.classList.add(shiftClass);
            monthWrap.ontransitionend = (event) => {
                monthWrap.classList.remove(animationClass);
                addElement(this.generateMonth(shiftNewMonth));
                monthWrap.removeChild(elementToRemove);
                monthWrap.classList.remove(shiftClass);
                this.removeAttribute("style");
            };
        }
        initializeDateTimeAttribute() {
            const year = this.todaysDate.getFullYear();
            const month = (this.todaysDate.getMonth() + 1);
            const date = this.todaysDate.getDate();
            const monthFormatted = (month >= 10) ? month : ("0" + month);
            const dateFormatted = (date >= 10) ? date : ("0" + date);
            this.dateTime = `${year}-${monthFormatted}-${dateFormatted}`;
        }
        connectedCallback() {
            this.update();
        }
        generateTodaysDateLabel() {
            const currentDateLabel = document.createElement("div");
            currentDateLabel.className = "calendar__date-label";
            const shiftedMonth = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getMonth();
            const shiftedYear = new Date(this.todaysDate.getFullYear(), this.todaysDate.getMonth() + this.monthShift).getFullYear();
            currentDateLabel.textContent = MonthsNames.RU[shiftedMonth] + ", " + shiftedYear;
            return currentDateLabel;
        }
        generateMonth(additionalShift = 0) {
            const shownMonthElement = new month_component_1.default(this.todaysDate, this.monthShift + additionalShift).render();
            shownMonthElement.className = "calendar__month";
            return shownMonthElement;
        }
        generateMonthCarousel() {
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
        generateControlPanel() {
            const controlPanel = document.createElement("div");
            controlPanel.className = "calendar__control-panel";
            controlPanel.appendChild(this.generateTodaysDateLabel());
            controlPanel.appendChild(new ControlPanel().render());
            return controlPanel;
        }
        update() {
            this.innerHTML = "";
            this.appendChild(this.generateControlPanel());
            this.appendChild(this.generateMonthCarousel());
        }
    }
    exports.default = Calendar;
});
define("app/app.component", ["require", "exports", "app/components/calendar.component"], function (require, exports, calendar_component_1) {
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
class ControlPanel {
    constructor() {
        this.backClickEvent = new CustomEvent("backClick", { bubbles: true });
        this.toNowClickEvent = new CustomEvent("toNowClick", { bubbles: true });
        this.nextClickEvent = new CustomEvent("nextClick", { bubbles: true });
    }
    generateControlButtons() {
        const controlPanel = document.createElement("div");
        const backButton = document.createElement("button");
        const nowButton = document.createElement("button");
        const nextButton = document.createElement("button");
        controlPanel.className = "calendar__control-buttons";
        backButton.className = "calendar__control-button calendar__control-button_back";
        nowButton.className = "calendar__control-button calendar__control-button_now";
        nextButton.className = "calendar__control-button calendar__control-button_next";
        controlPanel.appendChild(backButton);
        controlPanel.appendChild(nowButton);
        controlPanel.appendChild(nextButton);
        backButton.onclick = (event) => {
            event.currentTarget.dispatchEvent(this.backClickEvent);
        };
        nowButton.onclick = (event) => {
            event.currentTarget.dispatchEvent(this.toNowClickEvent);
        };
        nextButton.onclick = (event) => {
            event.currentTarget.dispatchEvent(this.nextClickEvent);
        };
        return controlPanel;
    }
    render() {
        const controlPanel = this.generateControlButtons();
        return controlPanel;
    }
}
const MonthsNames = {
    RU: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    EN: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
