import time
from datetime import datetime, timedelta
import win32gui

def get_active_window_title():
    # Get the title of the currently active window
    active_window = win32gui.GetForegroundWindow()
    window_title = win32gui.GetWindowText(active_window)
    return window_title

def track_user_usage(apps_list, tracking_file):
    app_elapsed_time = {}

    while True:
        try:
            active_window_title = get_active_window_title()

            for app in apps_list:
                if app.lower() in active_window_title.lower():
                    # If the app is detected, store the start time if not already stored
                    if app not in app_elapsed_time:
                        app_elapsed_time[app] = datetime.now()

                elif app in app_elapsed_time:
                    # If the app is no longer active, update the elapsed time and log
                    elapsed_time = datetime.now() - app_elapsed_time[app]
                    elapsed_time_seconds = elapsed_time.total_seconds()
                    elapsed_minutes, elapsed_seconds = divmod(elapsed_time_seconds, 60)

                    if app in app_elapsed_time:
                        app_elapsed_time[app] += elapsed_time
                    else:
                        app_elapsed_time[app] = datetime.now()

                    formatted_time = f"{int(elapsed_minutes):02}:{int(elapsed_seconds):02}"

                    with open(tracking_file, 'a') as file:
                        file.write(f"{app}: {formatted_time}\n")

            time.sleep(5)  # Check every 5 seconds

        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    apps_file = "apps.txt"
    tracking_file = "tracking.txt"

    try:
        with open(apps_file, 'r') as file:
            apps_list = [line.strip() for line in file.readlines() if line.strip()]
    except FileNotFoundError:
        print(f"Error: {apps_file} not found.")
        exit()

    print("Tracking user usage. Press Ctrl+C to stop.")
    try:
        track_user_usage(apps_list, tracking_file)
    except KeyboardInterrupt:
        print("Tracking stopped.")
