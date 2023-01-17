import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TaskTable from './components/TaskTable';
import InsertTaskForm from './components/InsertTaskForm';
import UpdateTaskForm from './components/UpdateTaskForm';
import Swal from 'sweetalert2'

function App() {
  const baseurl = `http://localhost/backendinfocasas/public/api`
  const [tasks, setTasks] = useState([])
  const [taskedit, setTaskEdit] = useState(false)
  const initialFormState = { id: null, name: '', desc: '', completed: 0 }
  const [currentTask, setCurrentTask] = useState(initialFormState)
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${baseurl}/tasks`)
      setTasks(data.data)
    } 
    catch (error) {
      console.log(error)
    } 
    finally {
      setTimeout(() => {
        setLoading(false)
      });
    }
  }

  const insertTask = async (task) => {
      try {
        const { data } = await axios.post(`${baseurl}/tasks`, task)

        Swal.fire({
          icon: 'success',
          title: data.data.MENSAJE,
          showConfirmButton: true,
          timer: 1500
        })

      } 
      catch (error) {

        Swal.fire({
          icon: 'error',
          title: error.response.data.data.MENSAJE,
          showConfirmButton: true,
          timer: 1500
        })

      } 
      finally {
        getTasks()
      } 
  }

  const updateTask = async (task) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, updated it!'
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await axios.put(`${baseurl}/tasks`, task)

            setTaskEdit(false)

            Swal.fire({
              icon: 'success',
              title: data.data.MENSAJE,
              showConfirmButton: true,
              timer: 1500
            })
          }
          catch (error) {
            Swal.fire({
              icon: 'error',
              title: error.response.data.data.MENSAJE,
              showConfirmButton: false,
              timer: 1500
            })
          }
          finally {
            getTasks()
          }
        }
      })
  }

  const clickEditTask = (task) => {
    setTaskEdit(true)

    setCurrentTask({ id: task.id, name: task.nameTask, desc: task.descriptionTask, completed: task.completedTask  })
  }

  const deleteTask = async (taskid) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`${baseurl}/tasks/${taskid}`)

          Swal.fire(
            'Deleted!',
            data.data.MENSAJE,
            'success'
          )
        }
        catch (error) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.data.MENSAJE,
            showConfirmButton: false,
            timer: 1500
          })
        }
        finally {
          getTasks()
        }
      }
    })
  }


  useEffect(() => {
    getTasks();
  },[])

  return (
    <div className="container">
      <h1 class="p-5">INFOCASAS FRONTEND</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Form task</h2>
          {
            taskedit === false ? (
              <InsertTaskForm inserttaskprop={insertTask} />
            ) : (
                <UpdateTaskForm currenttaskprop={currentTask} updatetaskprop={updateTask} />
            )
          }
        </div>
        <div className="flex-large">
          <h2>View tasks</h2>
          {
            loading === true ?
            (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            ) : (
                <TaskTable tasksprop={tasks} deletetaskprop={deleteTask} clickedittaskprop={clickEditTask} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
