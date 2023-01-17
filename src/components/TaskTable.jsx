import React from 'react'

const TaskTable = (props) => (
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                props.tasksprop.length > 0 ?
                props.tasksprop.map(task => (
                    <tr>
                        <td>{task.id}</td>
                        <td>{task.nameTask}</td>
                        <td>{task.descriptionTask}</td>
                        <td>
                            <button className="button muted-button me-2" onClick={() => props.clickedittaskprop(task)}>Edit</button>
                            <button className="button muted-button" onClick={() => props.deletetaskprop(task.id)}>Delete</button>
                        </td>
                    </tr>
                )) : 
                    (<tr>
                        <td colSpan={4}>No users</td>
                    </tr>)
            }
        </tbody>
    </table>
)

export default TaskTable