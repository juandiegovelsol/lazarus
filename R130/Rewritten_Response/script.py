import os
import shutil

def organize_folder(work_folder):
    # Define target directories and file type mappings
    target_dirs = {
        'logs': ['.log'],
        'delete': ['.tmp', '.bak', '.swp'],
        'src/python': ['.py'],
        'src/javascript': ['.js'],
        'src/html': ['.html'],
        'artifact': ['.zip', '.tar.gz']
    }

    # Create directories based on target_dirs structure
    for folder in target_dirs.keys():
        os.makedirs(os.path.join(work_folder, folder), exist_ok=True)

    # Initialize summary report
    summary_report = []

    # Organize files based on extension
    for filename in os.listdir(work_folder):
        file_path = os.path.join(work_folder, filename)

        # Skip directories
        if os.path.isdir(file_path):
            continue

        # Check file extension and move accordingly
        destination = None
        for folder, extensions in target_dirs.items():
            if any(filename.endswith(ext) for ext in extensions):
                destination = os.path.join(work_folder, folder, filename)
                break

        # Move file if destination is set
        if destination and file_path != destination:
            shutil.move(file_path, destination)
            summary_report.append(f"{file_path} moved to {destination}")

    return summary_report

def main():
    work_folder = input("Enter the path to your work folder: ")
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