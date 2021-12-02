

const viewCtrl = (function(){
    const domElements = {
        addTaskForm: {
            form: document.forms.addTaskForm,

            taskNameInput() {
                return this.form.taskName;
            } 
        },
        searchForm: {
            form: document.forms.searchForm,

            taskNameInput() {
                return this.form.searchInput;
            } 
        },
        taskContainer: document.querySelector('.main__items-container'),
        emptyTaskLabel: document.querySelector('#emptyTaskLabel'),
    };

    const displayEmptyTaskLabel = toggle => {
        domElements.emptyTaskLabel.hidden = !toggle;
    };

    const getTaskHTML = (taskName, taskID) => {
        return `
            <div class="main__item" data-task-id="${taskID}">
                <h4 class="main__item-title">${taskName}</h4>

                <div class="main__item-btns">
                    <button data-action="edit" class="waves-effect waves-light btn-small purple darken-4 modal-trigger">
                        <i class="material-icons center">edit</i>
                    </button>

                    <button data-action="delete" class="main__item-btn waves-effect waves-light btn-small purple darken-4">
                        <i class="material-icons center">done</i>
                    </button>
                </div>
            </div>
        `
    };

    const renderTask = (taskName, taskID) => {
        const html = getTaskHTML(taskName, taskID);

        domElements.taskContainer.insertAdjacentHTML('afterbegin', html);

        return html;
    };

    const addTaskHiddenAnimation = task => {
        task.classList.add('scaled');
    };

    return {
        domElements: domElements,
        renderTask: renderTask,
        getTaskHTML: getTaskHTML,
        addTaskHiddenAnimation: addTaskHiddenAnimation,
        displayEmptyTaskLabel: displayEmptyTaskLabel,
    };
})();