const ls = window.localStorage;
const KEY = "EBBA_PLAN_LS";

function Plan(initStart) {
    let priv = {
        list: [],
        start: new Date(initStart.getTime()),
        hasIron: false,
        hasVitaminD: false
    };

    init();

    function init() {
        // load from local storage if exists
        const restored = JSON.parse(ls.getItem(KEY));

        const lsStart = restored && new Date(restored.start);

        // If local storage is from today, restore
        if (lsStart && lsStart.getDate && lsStart.getDate() === new Date().getDate()) {
            priv.start = lsStart;
            priv.hasVitaminD = restored.hasVitaminD;
            priv.hasIron = restored.hasIron;
        }
    }

    function saveToLocalStorage() {
        ls.setItem(KEY, JSON.stringify(priv));
    }

    function formatTime(d) {
        const l = new Date(d.getTime())
        const hour = String(l.getHours()).padStart(2, '0');
        const minutes = String(l.getMinutes()).padStart(2, '0');

        l.setMinutes(l.getMinutes() + 30);
        const hour30 = String(l.getHours()).padStart(2, '0');
        const minutes30 = String(l.getMinutes()).padStart(2, '0');


        return `${hour}:${minutes} - ${hour30}:${minutes30} `
    }

    return {
        addItem: ({ text, minutesAfter }) => {
            priv.list.push({ text, minutesAfter });
        },
        getItems: () => {
            let dateClone = new Date(priv.start.getTime());
            return priv.list.slice().map((item, index) => {
                dateClone.setMinutes(dateClone.getMinutes() + (item.minutesAfter || 0));

                return {
                    text: item.text,
                    time: formatTime(dateClone)
                }
            });
        },
        empty: () => {
            priv.list = [];
        },
        get: () => {
            return {
                ...priv
            };
        },
        update: ({ hasIron, hasVitaminD, start }) => {
            if (hasIron !== undefined) priv.hasIron = hasIron;
            if (hasVitaminD !== undefined) priv.hasVitaminD = hasVitaminD;
            if (start !== undefined) priv.start = start;

            saveToLocalStorage();

            return {
                ...priv
            }
        }
    }
}