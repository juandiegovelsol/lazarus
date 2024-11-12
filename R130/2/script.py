import os
import shutil

def organize_folder(work_folder):
    # Create directories if they do not exist
    logs_dir = os.path.join(work_folder, 'logs')
    delete_dir = os.path.join(work_folder, 'delete')
    src_dir = os.path.join(work_folder, 'src')
    artifact_dir = os.path.join(work_folder, 'artifact')
    
    os.makedirs(logs_dir, exist_ok=True)
    os.makedirs(delete_dir, exist_ok=True)
    os.makedirs(src_dir, exist_ok=True)
    os.makedirs(artifact_dir, exist_ok=True)

    # Create programming language directories inside src
    py_dir = os.path.join(src_dir, 'python')
    js_dir = os.path.join(src_dir, 'javascript')
    html_dir = os.path.join(src_dir, 'html')
    
    os.makedirs(py_dir, exist_ok=True)
    os.makedirs(js_dir, exist_ok=True)
    os.makedirs(html_dir, exist_ok=True)

    # Initialize a list to store the cleanup actions
    cleanup_actions = []

    # Iterate through all files in the work folder
    for filename in os.listdir(work_folder):
        file_path = os.path.join(work_folder, filename)

        # Check if the file is a regular file (not a directory)
        if os.path.isfile(file_path):
            # Get the file extension
            file_ext = os.path.splitext(filename)[1]

            # Move log files to the logs directory
            if file_ext == '.log':
                destination = os.path.join(logs_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to logs")

            # Move temporary files to the delete folder
            elif file_ext in ['.tmp', '.bak', '.swp']:
                destination = os.path.join(delete_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to delete")

            # Organize programming language files into the respective folders
            elif file_ext == '.py':
                destination = os.path.join(py_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to src/python")
            elif file_ext == '.js':
                destination = os.path.join(js_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to src/javascript")
            elif file_ext == '.html':
                destination = os.path.join(html_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to src/html")

            # Organize artifact files into the artifact folder
            elif file_ext in ['.zip', '.tar.gz']:
                destination = os.path.join(artifact_dir, filename)
                shutil.move(file_path, destination)
                cleanup_actions.append(f"{file_path} moved to artifact")

    # Generate a summary cleanup report
    if cleanup_actions:
        print("Summary Cleanup Report:")
        for action in cleanup_actions:
            print(action)
    else:
        print("No files were moved during the cleanup process.")

# Specify the work folder path
work_folder = 'src'

# Call the function to organize the folder
organize_folder(work_folder)