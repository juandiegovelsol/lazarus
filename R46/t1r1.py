"""
This is a Flask application that allows users to create, delete, and view tasks dynamically via a web interface.
APScheduler is used to handle task scheduling, and Flask’s API routes interact with the scheduler to enable dynamic task management.
"""

from flask import Flask, request, jsonify
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.cron import CronTrigger
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(filename='scheduler.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.start()

# In-memory dictionary to store task information
tasks = {}

# Example task function
def dynamic_task(task_name):
    """
    This function represents a task that will be executed by the scheduler.
    
    Args:
        task_name (str): The name of the task.
    """
    logging.info(f"Executing task: {task_name}")
    print(f"Task '{task_name}' is running!")


# Route to add a new task dynamically
@app.route('/add_task', methods=['POST'])
def add_task():
    """
    This route adds a new task to the scheduler.
    
    Request Body:
        task_name (str): The name of the task.
        interval_seconds (int): The interval in seconds at which the task will be executed.
    
    Returns:
        JSON response with a message indicating whether the task was added successfully.
    """
    try:
        data = request.json
        task_name = data.get('task_name')
        interval_seconds = data.get('interval_seconds')
        
        if not task_name or not interval_seconds:
            return jsonify({"message": "Task name and interval seconds are required!"}), 400
        
        if task_name in tasks:
            return jsonify({"message": "Task already exists!"}), 400

        # Add task to the scheduler
        job = scheduler.add_job(dynamic_task, 
                                trigger=IntervalTrigger(seconds=int(interval_seconds)),
                                args=[task_name], 
                                id=task_name)

        # Store task details
        tasks[task_name] = {
            'interval_seconds': interval_seconds,
            'job_id': job.id
        }

        logging.info(f"Task '{task_name}' added successfully!")
        return jsonify({"message": f"Task '{task_name}' added successfully!"}), 201
    
    except Exception as e:
        logging.error(f"Error adding task: {str(e)}")
        return jsonify({"message": "Error adding task!"}), 500


# Route to delete a task
@app.route('/delete_task/<task_name>', methods=['DELETE'])
def delete_task(task_name):
    """
    This route deletes a task from the scheduler.
    
    Args:
        task_name (str): The name of the task to be deleted.
    
    Returns:
        JSON response with a message indicating whether the task was deleted successfully.
    """
    try:
        if task_name not in tasks:
            return jsonify({"message": "Task not found!"}), 404

        # Remove the task from the scheduler
        scheduler.remove_job(tasks[task_name]['job_id'])

        # Remove from task list
        del tasks[task_name]

        logging.info(f"Task '{task_name}' deleted successfully!")
        return jsonify({"message": f"Task '{task_name}' deleted successfully!"}), 200
    
    except Exception as e:
        logging.error(f"Error deleting task: {str(e)}")
        return jsonify({"message": "Error deleting task!"}), 500


# Route to list all tasks
@app.route('/list_tasks', methods=['GET'])
def list_tasks():
    """
    This route returns a list of all tasks in the scheduler.
    
    Returns:
        JSON response with a list of tasks.
    """
    try:
        return jsonify(tasks), 200
    
    except Exception as e:
        logging.error(f"Error listing tasks: {str(e)}")
        return jsonify({"message": "Error listing tasks!"}), 500


# Route to modify a task's interval
@app.route('/modify_task/<task_name>', methods=['PUT'])
def modify_task(task_name):
    """
    This route modifies the interval of a task in the scheduler.
    
    Args:
        task_name (str): The name of the task to be modified.
    
    Request Body:
        interval_seconds (int): The new interval in seconds at which the task will be executed.
    
    Returns:
        JSON response with a message indicating whether the task was modified successfully.
    """
    try:
        data = request.json
        new_interval_seconds = data.get('interval_seconds')

        if task_name not in tasks:
            return jsonify({"message": "Task not found!"}), 404

        # Remove the old task
        scheduler.remove_job(tasks[task_name]['job_id'])

        # Add new task with updated interval
        job = scheduler.add_job(dynamic_task, 
                                trigger=IntervalTrigger(seconds=int(new_interval_seconds)),
                                args=[task_name],
                                id=task_name)

        # Update task details
        tasks[task_name]['interval_seconds'] = new_interval_seconds
        tasks[task_name]['job_id'] = job.id

        logging.info(f"Task '{task_name}' modified successfully!")
        return jsonify({"message": f"Task '{task_name}' modified successfully!"}), 200
    
    except Exception as e:
        logging.error(f"Error modifying task: {str(e)}")
        return jsonify({"message": "Error modifying task!"}), 500


# Route to pause a task
@app.route('/pause_task/<task_name>', methods=['POST'])
def pause_task(task_name):
    """
    This route pauses a task in the scheduler.
    
    Args:
        task_name (str): The name of the task to be paused.
    
    Returns:
        JSON response with a message indicating whether the task was paused successfully.
    """
    try:
        if task_name not in tasks:
            return jsonify({"message": "Task not found!"}), 404

        # Pause the task
        scheduler.pause_job(tasks[task_name]['job_id'])

        logging.info(f"Task '{task_name}' paused successfully!")
        return jsonify({"message": f"Task '{task_name}' paused successfully!"}), 200
    
    except Exception as e:
        logging.error(f"Error pausing task: {str(e)}")
        return jsonify({"message": "Error pausing task!"}), 500


# Route to resume a paused task
@app.route('/resume_task/<task_name>', methods=['POST'])
def resume_task(task_name):
    """
    This route resumes a paused task in the scheduler.
    
    Args:
        task_name (str): The name of the task to be resumed.
    
    Returns:
        JSON response with a message indicating whether the task was resumed successfully.
    """
    try:
        if task_name not in tasks:
            return jsonify({"message": "Task not found!"}), 404

        # Resume the task
        scheduler.resume_job(tasks[task_name]['job_id'])

        logging.info(f"Task '{task_name}' resumed successfully!")
        return jsonify({"message": f"Task '{task_name}' resumed successfully!"}), 200
    
    except Exception as e:
        logging.error(f"Error resuming task: {str(e)}")
        return jsonify({"message": "Error resuming task!"}), 500


if __name__ == '__main__':
    app.run(debug=True)