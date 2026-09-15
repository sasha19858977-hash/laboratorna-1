let tasks = [];

let currentFilter = "all";


// =====================================
// ДОДАВАННЯ ЗАВДАННЯ
// =====================================

function addTask() {

    const input =
        document.getElementById("taskInput");

    const subject =
        document.getElementById("subjectInput");

    const date =
        document.getElementById("dateInput");

    const priority =
        document.getElementById("priorityInput");


    const text =
        input.value.trim();


    if (text === "") {

        alert(
            "Введіть назву навчального завдання!"
        );

        input.focus();

        return;
    }


    const task = {

        id: Date.now(),

        text: text,

        subject: subject.value,

        date: date.value,

        priority: priority.value,

        completed: false

    };


    tasks.push(task);


    input.value = "";

    date.value = "";


    renderTasks();

}


// =====================================
// ЗМІНА СТАТУСУ
// =====================================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed =
                !task.completed;

        }

        return task;

    });


    renderTasks();
}


// =====================================
// ВИДАЛЕННЯ
// =====================================

function deleteTask(id) {

    tasks = tasks.filter(task => {

        return task.id !== id;

    });


    renderTasks();
}


// =====================================
// ФІЛЬТРАЦІЯ
// =====================================

function filterTasks(filter, button) {

    currentFilter = filter;


    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    renderTasks();

}


// =====================================
// ВІДОБРАЖЕННЯ
// =====================================

function renderTasks() {

    const list =
        document.getElementById("taskList");


    list.innerHTML = "";


    const filteredTasks =
        tasks.filter(task => {

            if (
                currentFilter === "active"
            ) {

                return !task.completed;

            }


            if (
                currentFilter === "completed"
            ) {

                return task.completed;

            }


            return true;

        });


    if (filteredTasks.length === 0) {

        list.innerHTML = `
            <div class="empty-message">
                ✦ Завдань поки немає
            </div>
        `;

    }


    filteredTasks.forEach(task => {


        const element =
            document.createElement("div");


        element.className =
            "task";


        // Виконано

        if (task.completed) {

            element.classList.add(
                "completed"
            );

        }


        // Пріоритет

        if (
            task.priority === "Високий"
        ) {

            element.classList.add(
                "priority-high"
            );

        }


        if (
            task.priority === "Середній"
        ) {

            element.classList.add(
                "priority-medium"
            );

        }


        if (
            task.priority === "Низький"
        ) {

            element.classList.add(
                "priority-low"
            );

        }


        // Форматування дати

        let formattedDate =
            "Без дедлайну";


        if (task.date) {

            const date =
                new Date(task.date);


            formattedDate =
                date.toLocaleDateString(
                    "uk-UA"
                );

        }


        // HTML завдання

        element.innerHTML = `

            <div class="task-title">

                ${task.completed ? "✓" : "○"}

                ${task.text}

            </div>


            <div class="task-info">

                <span>
                    📚 ${task.subject}
                </span>

                <span>
                    📅 ${formattedDate}
                </span>

                <span>
                    ${getPriorityIcon(task.priority)}

                    ${task.priority}
                </span>

            </div>


            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="
                        toggleTask(${task.id})
                    "
                >

                    ${
                        task.completed
                            ? "↩ Скасувати"
                            : "✓ Виконано"
                    }

                </button>


                <button
                    class="delete-btn"
                    onclick="
                        deleteTask(${task.id})
                    "
                >

                    🗑 Видалити

                </button>

            </div>

        `;


        list.appendChild(element);

    });


    updateStatistics();

}


// =====================================
// ІКОНКА ПРІОРИТЕТУ
// =====================================

function getPriorityIcon(priority) {

    if (
        priority === "Високий"
    ) {

        return "🔴";

    }


    if (
        priority === "Середній"
    ) {

        return "🟠";

    }


    return "🟢";

}


// =====================================
// СТАТИСТИКА
// =====================================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const remaining =
        total - completed;


    let progress = 0;


    if (total > 0) {

        progress =
            Math.round(
                completed / total * 100
            );

    }


    document.getElementById(
        "totalCount"
    ).textContent =
        total;


    document.getElementById(
        "completedCount"
    ).textContent =
        completed;


    document.getElementById(
        "remainingCount"
    ).textContent =
        remaining;


    document.getElementById(
        "progressText"
    ).textContent =
        progress + "%";


    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";

}


// =====================================
// ПОТОЧНА ДАТА
// =====================================

function showCurrentDate() {

    const today =
        new Date();


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const year =
        today.getFullYear();


    document.getElementById(
        "todayDate"
    ).textContent =
        `${day}.${month}.${year}`;

}


// =====================================
// ЗАПУСК
// =====================================

showCurrentDate();

renderTasks();