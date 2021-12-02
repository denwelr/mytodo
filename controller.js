const controller = (function(modelCtrl, uiCtrl){
    const {addTaskForm, searchForm, taskContainer} = uiCtrl.domElements;

    const filterTasks = () => {
        const tasks = Array.from(taskContainer.children);

        tasks.forEach(task => {
            const taskTitle = task.querySelector('.main__item-title');
            if(!taskTitle) return;

            const taskName = taskTitle.textContent.toLowerCase();
            
            if(taskName.includes(searchForm.taskNameInput().value.toLowerCase())) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    };

    const deleteTask = task => {
        task.addEventListener('transitionend', () => {
            task.remove();
        });
    };

    const addTask = event => {
        event.preventDefault();

        const taskForm = addTaskForm.form;
        const taskName = addTaskForm.taskNameInput().value;

        if(taskName.trim() === '') {
            return;
        }
    
        const createdTaskID = modelCtrl.addTaskToTasks({title: taskName});
        uiCtrl.renderTask(taskName, createdTaskID);

        taskForm.reset();

        // Убираем надпись что нет задач
        uiCtrl.displayEmptyTaskLabel(false);

        filterTasks();
    }

    const removeTask = event => {           
        const target = event.target.closest('[data-action="delete"]');
        if(!target) return;

        const item = target.closest('.main__item');

        uiCtrl.addTaskHiddenAnimation(item);
        deleteTask(item);

        const taskLength = modelCtrl.removeTaskOfTasks(parseInt(item.dataset.taskId));

        if(!taskLength) {
            item.addEventListener('transitionend', () => {
                // Показываем надпись что нет задач
                uiCtrl.displayEmptyTaskLabel(true);
            });
        }
    };

    const finishEditTask = event => {
        const target = event.target.closest('[data-action="edit-done"]');
        if(!target) return;

        const task = target.closest('.main__item');
        const taskName = task.querySelector('.main__input').value;

        const prevTaskName = task.querySelector('.main__input').dataset.prevTaskName;

        const html = uiCtrl.getTaskHTML(taskName);
        task.outerHTML = html;

        modelCtrl.renameTask(prevTaskName, taskName, parseInt(task.dataset.taskId));
    };

    const editTask = event => {
        const target = event.target.closest('[data-action="edit"]');
        if(!target) return;

        const taskTitle = target.closest('.main__item').querySelector('.main__item-title');

        const task = target.closest('.main__item');

        task.innerHTML = `
            <input class="main__input" data-prev-task-name="${taskTitle.textContent}" value="${taskTitle.textContent}">

            <button data-action="edit-done" class="waves-effect waves-light btn-small purple darken-4 modal-trigger">
                <i class="material-icons center">done</i>
            </button>
        `;
    };
    
    const InitDOMEvents = () => {
        addTaskForm.form.addEventListener('submit', addTask);

        taskContainer.addEventListener('click', removeTask);
        taskContainer.addEventListener('click', editTask);
        taskContainer.addEventListener('click', finishEditTask);

        searchForm.taskNameInput().addEventListener('input', filterTasks);
        searchForm.form.addEventListener('submit', event => event.preventDefault());

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');

            var instances = M.Modal.init(elems);
        });
    };

    const getTasks = () => {
        const tasks = modelCtrl.getTasks();

        tasks.forEach(task => {
            uiCtrl.renderTask(task.title, task.id);
            modelCtrl.createTask(task);

            uiCtrl.displayEmptyTaskLabel(false);
        });
    };

    return {
        init() {
            console.log('App started!');

            InitDOMEvents();
            getTasks();
        }
    };

})(modelCtrl, viewCtrl);

controller.init();