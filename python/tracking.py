import psutil
import json
import time
from datetime import datetime, timedelta
import os

# Paths
json_file_path = 'app_running_times.json'
apps_list_path = 'database/apps.txt'
settings_path = 'database/settings.json'

# Function to load the list of applications to track
def load_tracked_apps():
    with open(apps_list_path, 'r') as file:
        return [line.strip() for line in file.readlines()]

# Function to load running times from the JSON file
def load_running_times():
    try:
        with open(json_file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

# Function to save running times to the JSON file
def save_running_times(running_times):
    with open(json_file_path, 'w') as file:
        json.dump(running_times, file, indent=4)

# Function to check the Focus_On setting
def check_focus_on_setting():
    try:
        with open(settings_path, 'r') as file:
            settings = json.load(file)
            return settings.get("Focus_On", False)
    except FileNotFoundError:
        print("Settings file not found. Assuming Focus_On is False.")
        return False

# Convert Unix timestamp to a readable datetime string
def timestamp_to_readable(ts):
    return datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

# Parse the total duration string and return it as seconds
def parse_duration_to_seconds(duration_str):
    hours, minutes, seconds = map(int, duration_str.split(":"))
    return timedelta(hours=hours, minutes=minutes, seconds=seconds).total_seconds()

# Function to update the running times of applications
def update_running_times(tracked_apps):
    current_running_times = load_running_times()
    current_processes = {p.name(): p.create_time() for p in psutil.process_iter(['name', 'create_time']) if p.name() in tracked_apps}

    for app_name, details in list(current_running_times.items()):
        if app_name not in current_processes and "start_time" in details:
            # Calculate duration since last recorded start time and update total duration
            end_time = time.time()
            start_time = datetime.strptime(details["start_time"], '%Y-%m-%d %H:%M:%S').timestamp()
            duration = end_time - start_time
            total_duration_seconds = parse_duration_to_seconds(details["total_duration"]) + duration
            total_duration_str = str(timedelta(seconds=total_duration_seconds))
            current_running_times[app_name]["total_duration"] = total_duration_str.split('.')[0]  # Update without milliseconds
            del current_running_times[app_name]["start_time"]  # Remove start_time indicating the app is no longer running
        elif app_name in current_processes:
            # Ensure start_time is always up to date
            current_running_times[app_name]["start_time"] = timestamp_to_readable(current_processes[app_name])

    save_running_times(current_running_times)

# Main loop to periodically update running times
try:
    tracked_apps = load_tracked_apps()
    while True:
        if not check_focus_on_setting():
            print("Focus_On is set to False. Exiting...")
            break
        update_running_times(tracked_apps)
        time.sleep(60)  # Check every minute
except KeyboardInterrupt:
    print("Stopping the application running time tracker.")
