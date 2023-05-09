import React, { useEffect, useState } from "react";
import "../styles/index.scss";
import { AiFillDelete, AiFillEdit, AiFillSave } from 'react-icons/ai';
import { getTasks, createTask, deleteTasks, updateTask } from "./utils.jsx";

//create your first component
const Home = props => {
	const [tasks, setTasks] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [editingDescription, setEditingDescription] = useState("");
	

	const Enter = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			createTask(e.target.value, setTasks);
			e.target.value = "";
		}
	};

	const saveWithEnter = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			handleSave();
		}
	}

	const handleEdit = (task) => {
		console.log('log de task',task)
		setEditingId(task.id);
		console.log('log de id',editingId)
		setEditingDescription(task.descripcion);
	};

	const handleSave = () => {
		if(editingDescription!==""){
			const updatedTask = { id: editingId, descripcion: editingDescription };
			updateTask(updatedTask,tasks,setTasks);
			setEditingId(null);
			setEditingDescription("");
		}else{
			alert('Por favor, rellene el campo con una tarea')
		}
	};

	const formatearFecha = (fecha)=>{
		const fechaFormateada = new Date(fecha);
		const mes = fechaFormateada.getMonth() + 1;
		const dia = fechaFormateada.getDate();
		const año = fechaFormateada.getFullYear();
		const nuevaFechaFormateada = `${dia}/${mes}/${año}`;
		return nuevaFechaFormateada;
	}

	useEffect(() => {
		getTasks(setTasks);
	}, []);
	

	return (
		<div className="titulo">
			<h1>To do List</h1>
			<div className="container d-flex justify-content-center text-align-center">
				<div>
					<input
						className="input1"
						placeholder=" ¿What needs to be done?"
						onKeyUp={e => Enter(e)}
					/>
					<ul>
						{tasks.length === 0 ? (
							<li className="tareas notask">
								No task, add a task
							</li>
						) : (
							tasks.map((t) => {
								const fechaFormateda = formatearFecha(t.fechaCreacion);
								return (
									<div key={t.id}>
										<li className="tareas">
											{editingId === t.id ? 
											(
												<>
													<input 
														required
														className="input1"
														type="text"
														value={editingDescription}
														onKeyUp={e => saveWithEnter(e)}
														onChange={(e) => (setEditingDescription(e.target.value))}>
													</input>
													<button
														className="botonSave"
														onClick={handleSave}
														>
														<AiFillSave />
													</button>
												</>
											) : (
												<>
													<p>{t.descripcion}</p>
													<span className="fecha">{fechaFormateda}</span>
													<button
														className="boton"
														onClick={() => {
															deleteTasks(t.id, setTasks);
															getTasks(setTasks);
														}}>
														<AiFillDelete />
													</button>
													<button
														className="botonEdit"
														onClick={()=>{handleEdit(t)
														setEditingId(t.id)}}>
														<AiFillEdit />
													</button>
												</>)
											}

										</li>
									</div>
								);
							})
						)}
						{tasks.length > 0 ? (
							<li className="contadordetareas">
								{tasks.length > 1
									? `${tasks.length} items left`
									: `${tasks.length} item left`}
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
			<button
				className="btn btn-danger"
				onClick={() => {
					setTasks([]);
					deleteTasks();
				}}>
				Erase Tasks
			</button>
		</div>
	);
};

export default Home;


