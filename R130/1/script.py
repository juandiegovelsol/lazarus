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

    # Initialize summary report
    summary_report = []

    # Organize files
    for filename in os.listdir(work_folder):
        file_path = os.path.join(work_folder, filename)

        # Skip directories
        if os.path.isdir(file_path):
            continue

        # Move log files to logs directory
        if filename.endswith('.log'):
            destination = os.path.join(logs_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to logs")

        # Move temporary files to delete folder
        elif filename.endswith(('.tmp', '.bak', '.swp')):
            destination = os.path.join(delete_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to delete")

        # Organize programming language files into src directory
        elif filename.endswith('.py'):
            destination = os.path.join(py_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to src/python")

        elif filename.endswith('.js'):
            destination = os.path.join(js_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to src/javascript")

        elif filename.endswith('.html'):
            destination = os.path.join(html_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to src/html")

        # Organize artifact files into artifact directory
        elif filename.endswith(('.zip', '.tar.gz')):
            destination = os.path.join(artifact_dir, filename)
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to artifact")

    return summary_report

def main():
    work_folder = "src"
    summary_report = organize_folder(work_folder)

    # Print summary report
    if summary_report:
        print("Summary Cleanup Report:")
        for report in summary_report:
            print(report)
    else:
        print("No files were moved.")

if __name__ == "__main__":
    main()