import React from "react";
import "./../styles/App.css";
import { useState } from "react";

function App() {

	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState('')
	const [newTitle, setNewTitle] = useState('')

	const addTask = (e) => {
		if(title !== '' && title.length >= 1) {
		setTodos([...todos, { title: title, edit:false, id: new Date().getTime() }])
		setTitle('')	
		}
	}

	const deleteTask = (id) => {
		setTodos(todos.filter((e) => {
			return e.id !== id
		}))
	}
	const toggleEdit = (id) => {
		setTodos(todos.filter((e) => {
			if(e.id === id) e.edit = !e.edit;
			return e;
		}))
	}
	const updateTask = (id) => {
		if(newTitle !== '' && newTitle.length >= 1) {
		setTodos(todos.filter((e)=> {
			if(id == e.id) e.title = newTitle
			return e;
		}))
		setNewTitle('')
		toggleEdit(id)
	} else {
		alert('Please enter new title')
	}
	}

	return (
		<div id="main">
			<textarea id='task' value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
			<br />
			<button id='btn' onClick={addTask}>Add Task</button>

			{
				todos.map((e) => {
					return (
						<ul key={e.id}>
							<li className='list'>{e.title}</li>
							<button className='edit' onClick={() => toggleEdit(e.id)}>Edit Task</button>
							<button className='delete' onClick={() => deleteTask(e.id)}>Delete Task</button>
							<br/><br />
							{
								e.edit ?<> <textarea className="editTask" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} required minLength={1}></textarea>
								<button className="saveTask" onClick={() => updateTask(e.id)}>Update Task</button> </>: null
							}
						</ul>
					)
				})
			}
		</div>
	);
}


export default App;
