const DAYS = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
const MONTHS = ["Jan", "Feb", "Mars", "Apr", "Mai", "Juni", "Juli", "Aug", "Okt", "Nov", "Des"];
const today = document.querySelector(".today");
const startOfDay = document.querySelector("#wake-time");
const currentDate = new Date();
const wakeUpRegex = new RegExp("^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})");
const dayItemTemplate = document.querySelector("#plan-item");

const checkboxes = document.querySelectorAll("input[type='checkbox'][data-prop]");

checkboxes.forEach(check => {
    check.addEventListener("click", e => {
        const prop = e.target.dataset.prop;
        console.log(prop);
        plan.update({ [prop]: e.target.checked });
    });
})

currentDate.setHours(6);
currentDate.setMinutes(0);
const plan = new Plan(currentDate);

(function () {
    // Init default plan
    plan.addItem({
        minutesAfter: 0,
        text: "Morgen"
    });

    // 09
    plan.addItem({
        minutesAfter: 150,
        text: "Dupp nr 1 (45 min - 90 min)"
    });

    // 1230
    plan.addItem({
        minutesAfter: 210,
        text: "Dupp nr 2 (90 min - 120 min)"
    });

    // 1530
    plan.addItem({
        minutesAfter: 180,
        text: "Dupp nr 3 om det trengs (45 min - 60 min)"
    });

    // 18 kvelds rutine
    plan.addItem({
        minutesAfter: 150,
        text: "Kveldsrutine"
    });

    // 19 sove
    plan.addItem({
        minutesAfter: 60,
        text: "Natta"
    });
})();

function showDay(d) {
    const date = d.getDate();
    const day = DAYS[d.getDay()];
    const month = MONTHS[d.getMonth()].toLowerCase();

    today.innerText = `${day} ${date}. ${month}`;
    today.dataset.date = d;
}

startOfDay.addEventListener("input", (e) => {
    const found = e.target.value.match(wakeUpRegex);
    if (found) {
        const d = new Date();
        d.setHours(Number(found.groups.hours));
        d.setMinutes(Number(found.groups.minutes));
        plan.update({
            start: d
        });
        showDayPlan(d);
    }
});

showDay(currentDate);
showDayPlan(currentDate);

function showDayPlan(date) {
    const ul = document.querySelector("ul.day-plan");
    ul.innerHTML = null;

    plan.getItems()
        .map(item => createLI(item.time, item.text))
        .forEach(item => ul.appendChild(item));

    checkboxes[0].checked = plan.get().hasVitaminD;
    checkboxes[1].checked = plan.get().hasIron;

    startOfDay.value = formatTimeToInpu(plan.get().start);
}

function formatTimeToInpu(d) {
    const hour = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${hour}:${minutes}`;
}

function createLI(time, text) {
    const temp = dayItemTemplate.cloneNode(true);
    const li = temp.content.children[0];

    const small = li.children[0];
    small.innerText = time;

    const span = li.children[1];
    span.innerText = text;

    return li;
}