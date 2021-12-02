
const modelCtrl = (function(){
    class Task {
        constructor(id,  title, desc, unixTime, isDone, category) {
            this.id = id;

            this.title = title;
            this.desc = desc;

            this.unixTime = unixTime;

            this.isDone = isDone;
            this.category = category;
        }
    }

    const tasks = [];

    const getTasks = () => {
        const tasks = localStorage.getItem('tasks');

        return JSON.parse(tasks);
    };

    const createTask = ({ id, title, desc = null, unixTime, isDone = false, category = "all" }) => {
        unixTime = unixTime || new Date().getTime();

        // Если ID не задан 
        if(id === undefined)  {
            if(!tasks.length) {
                id = 0;
            } else {
                id = tasks[tasks.length - 1]?.id + 1;
            }
        }
        const task = new Task(id, title, desc, unixTime, isDone, category);
        tasks.push(task);

        return task;
    };

    const renameTask = (prevTaskName, taskName, taskID) => {

        const task = tasks.find(el => el.id === taskID);

        if(!task)  {
            return;
        }
        
        task.title = taskName;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToTasks = (taskData) => {
        const task = createTask(taskData);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        return task.id;
    };

    const removeTaskOfTasks = taskID => { 

        const task = tasks.find(el => el.id === taskID);
        const taskIndex = tasks.findIndex(el => el.id === taskID);

        if(!task) {
            return;
        }
        tasks.splice(taskIndex, 1);   
        localStorage.setItem('tasks', JSON.stringify(tasks));

        return tasks.length;
    }
    
    return {
        getTasks: getTasks,
        addTaskToTasks: addTaskToTasks,
        createTask: createTask,
        renameTask: renameTask,
        removeTaskOfTasks: removeTaskOfTasks,
        tasks: tasks,
    };  
})();


