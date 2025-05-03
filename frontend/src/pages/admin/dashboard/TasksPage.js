import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for actions
import "./tasks.css"; // Import your CSS file

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Back Button Handler
  const handleBackClick = () => {
    window.history.back(); // Navigate back to previous page
  };

  return (
    <div className="page-container">
      <div className="page-header">
        {/* Back Arrow */}
        <FaArrowLeft className="back-arrow" onClick={handleBackClick} />
        <h2 className="page-title">Remaining Tasks</h2>
        <div className="page-actions">
        
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <button className="action-btn" onClick={() => alert(`Marking task as complete: ${task.id}`)}>
                    <FaCheckCircle /> Complete
                  </button>
                  <button className="action-btn" onClick={() => alert(`Deleting task: ${task.id}`)}>
                    <FaTimesCircle /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-tasks">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksPage;
