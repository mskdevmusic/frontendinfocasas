import React, { useState, useEffect } from 'react'

const UpdateTaskForm = (props) => {

    const [task, setTask] = useState(props.currenttaskprop)
    console.log(props.currenttaskprop)

    useEffect(() => {
        setTask(props.currenttaskprop)
    }, [props])

    const handleInputChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value, })
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            /* if (!task.name || !task.desc) return */

            props.updatetaskprop(task)
        }}
        >
            <label>Name</label>
            <input type="text" name="name" value={task.name} onChange={handleInputChange} />
            <label>Description</label>
            <input type="text" name="desc" value={task.desc} onChange={handleInputChange} />
            <button>Update task</button>

        </form>
    )
}

export default UpdateTaskForm