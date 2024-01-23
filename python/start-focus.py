import subprocess
import time

def stop_process_by_name(process_name):
    try:
        # Get a list of processes using 'tasklist' command
        process_list = subprocess.check_output(["tasklist", "/fo", "csv", "/nh"]).decode("utf-8").split('\n')

        # Find the process by name in the list
        target_process = next((line for line in process_list if process_name in line), None)

        if target_process:
            print(f"Process '{process_name}' is running. Closing...")

            # Extract the process ID (PID) from the process list
            pid = int(target_process.split(",")[1].strip(' "'))

            # Send SIGTERM signal to gracefully terminate the process
            subprocess.run(["taskkill", "/pid", str(pid)])

            time.sleep(5)  # Wait for process to close

            # Check if the process is still running
            try:
                subprocess.run(["taskkill", "/pid", str(pid)], check=True)
            except subprocess.CalledProcessError:
                print("Process closed.")
                return

            # Force close the process if it hasn't closed yet
            print("Forcing close...")
            subprocess.run(["taskkill", "/f", "/pid", str(pid)])
            print("Process closed.")
        else:
            print(f"Process '{process_name}' is not running.")
    except Exception as e:
        print(f"An error occurred: {e}")

def read_process_names_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            process_names = [line.strip() for line in file if line.strip()]
        return process_names
    except Exception as e:
        print(f"Error reading process names from file: {e}")
        return []

def stop_processes_from_file(file_path):
    while True:  # Infinite loop
        process_names = read_process_names_from_file(file_path)

        if not process_names:
            print("No process names found in the file.")
            break  # Exit the loop if no process names are found

        for process_name in process_names:
            stop_process_by_name(process_name)

        time.sleep(3)  # Wait for 3 seconds before the next iteration

if __name__ == "__main__":
    stop_processes_from_file("./database/apps.txt")  # When debugging, change the directory to ../database/apps.txt
