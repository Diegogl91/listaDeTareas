const url = "http://localhost:8081/api/tasks";

const getTasks = async (setTasks) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
            console.log(data, 'tareas')
            if (Array.isArray(data)) {
                setTasks(data);
            }
            return data;
    } catch (error) {
     console.log(error)   
    }
};

const createTask = async (task, setTasks) => {
    const taskToAdd = { "descripcion": task, "vigente": true };
    try {
        const response = await fetch(url + "/crearTarea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToAdd)
        })
            const data = await response.json;
                getTasks(setTasks);
                return data;
    } catch (error) {
        console.log(error);
    }
};

const updateTask = (updatedTask,tasks,setTasks) => {
    fetch(url + `/${updatedTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask)
    })
        .then(response => response.json())
        .then(data => {
            const updatedTasks = tasks.map((t) => t.id === data.id ? data : t);
            setTasks(updatedTasks);
            getTasks(setTasks);
        })
        .catch(error => console.log(error));
};

const deleteTasks = async (id, setTasks) => {
    try {
        const response = await fetch(url + `/${id}`, {
            method: "DELETE",
            body:JSON.stringify(id)
        })
            const data = await response.json;
                getTasks(setTasks);
                return data;
    } catch (error) {
        console.log(error)
    }

};

export { getTasks, createTask, updateTask, deleteTasks };