const DAYS = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
const MONTHS = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "Oktober", "November", "Desember"];
const today = document.querySelector(".today");
const startOfDay = document.querySelector("#start-of-day");
const timeSeven = new Date();
const wakeUpRegex = new RegExp("^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})");

timeSeven.setHours(7);
timeSeven.setMinutes(0);

function initDay() {
    const d = new Date();
    const date = d.getDate();
    const day = DAYS[d.getDay()];
    const month = MONTHS[d.getMonth()].toLowerCase();

    today.innerText = `${day} ${date}. ${month}`;
}

startOfDay.addEventListener("input", (e) => {
    const found = e.target.value.match(wakeUpRegex);
    if (found) {
        const d = new Date();
        d.setHours(Number(found.groups.hours));
        d.setMinutes(Number(found.groups.minutes));
        showDayPlan(d);
    }
});

initDay();
showDayPlan(timeSeven);

function showDayPlan(date) {
    // 07
    const ul = document.querySelector("ul.day-plan");
    ul.innerHTML = null;


    ul.append(createLI(dateToHourAndMinute(date), "Morgen"));

    // 09
    date.setHours(date.getHours() + 2);
    ul.append(createLI(dateToHourAndMinute(date), "Dupp nr 1 (45 min - 90 min)"));

    // 1230
    date.setHours(date.getHours() + 3);
    date.setMinutes(date.getMinutes() + 30);
    ul.append(createLI(dateToHourAndMinute(date), "Dupp nr 2 (90 min - 120 min)"));

    // 1530
    date.setHours(date.getHours() + 3);
    ul.append(createLI(dateToHourAndMinute(date), "Dupp nr 3 om det trengs (45 min - 60 min)"));

    // 18 kvelds rutine
    date.setHours(date.getHours() + 2);
    date.setMinutes(date.getMinutes() + 30);
    ul.append(createLI(dateToHourAndMinute(date), "Kveldsrutine"));

    // 19 sove
    date.setHours(date.getHours() + 1);
    ul.append(createLI(dateToHourAndMinute(date), "Natta"));
}

function createLI(time, text) {
    const li = document.createElement("li");
    const small = document.createElement("small");
    small.innerText = time;
    small.style.color = "#90506A";
    li.appendChild(small);
    li.classList.add("list-group-item");

    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);

    return li;
}

function dateToHourAndMinute(d) {
    const l = new Date(d.getTime())
    const hour = String(l.getHours()).padStart(2, '0');
    const minutes = String(l.getMinutes()).padStart(2, '0');

    l.setMinutes(l.getMinutes() + 30);
    const hour30 = String(l.getHours()).padStart(2, '0');
    const minutes30 = String(l.getMinutes()).padStart(2, '0'); 
 

    return `${hour}:${minutes} - ${hour30}:${minutes30} `
}