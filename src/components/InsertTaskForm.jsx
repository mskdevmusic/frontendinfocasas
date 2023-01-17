import React, { useState } from 'react'

const InsertTaskForm = (props) => {
    const initialFormState = { id: null, name: '', desc: '' }
    const [task, setTask] = useState(initialFormState)

    const handleInputChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value, })
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            /* if (!task.name || !task.desc) return */

            props.inserttaskprop(task)
            setTask(initialFormState)
        }}
        >
            <label>Name</label>
            <input type="text" name="name" value={task.name} onChange={handleInputChange} />
            <label>Description</label>
            <input type="text" name="desc" value={task.desc} onChange={handleInputChange} />
            <button >Add new task</button>
            
        </form>
    )
}

export default InsertTaskForm