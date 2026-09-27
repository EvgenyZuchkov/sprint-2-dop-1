import {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = { id: string, title: string }
type TasksType = {
    [key: string]: TaskType2
}

export type TaskType2 = {
    data: TaskType[]
    filter: FilterValuesType
}

export const App = () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: {
            data: [
                {id: v1(), title: "HTML&CSS1111", isDone: true},
                {id: v1(), title: "JS1111", isDone: true}
            ],
            filter: "all"
        },
        [todolistId2]: {
            data: [
                {id: v1(), title: "HTML&CSS22222", isDone: true},
                {id: v1(), title: "JS2222", isDone: true}
            ],
            filter: "all"
        }
    });


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td => td.id !== todolistId));
        delete tasks[todolistId];
    }


    function removeTask(payload: { todolistId: string, taskId: string }) {
        const {todolistId, taskId} = payload;
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.filter(el => el.id !== taskId)
            }
        })

    }

    function addTask(payload: { todolistId: string, title: string }) {
        const {todolistId, title} = payload

        let newTask: TaskType = {id: v1(), title: title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: [newTask, ...tasks[todolistId].data]
            }
        })
    }

    function changeStatus(payload: { todolistId: string, taskId: string, newIsDone: boolean }) {
        const {todolistId, taskId, newIsDone} = payload
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                data: tasks[todolistId].data.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
            }
        })
    }

    function changeFilter(payload: { todolistId: string, value: FilterValuesType }) {
        const {todolistId, value} = payload
        setTasks({
            ...tasks,
            [todolistId]: {
                ...tasks[todolistId],
                filter: value
            }
        })
    }

    return (
        <div className="App">
            {todolists.map((el) => {

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        // tasks={tasksForTodolist}
                        tasks={tasks[el.id].data}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}
