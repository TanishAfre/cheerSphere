import pyautogui
import time
import json

# Load settings from JSON file
with open('./database/settings.json', 'r') as f:
    settings = json.load(f)

# Check if NotificationEnable is true before triggering notifications
if settings.get("NotificationBlocking", {}).get("NotificationEnable", True):
    # Simulate pressing the Windows key + N
    pyautogui.hotkey('win', 'n')
    # Wait a bit for the action to be recognized
    time.sleep(0.6)
    # Simulate pressing the Enter key
    pyautogui.press('enter')
    # Wait a bit before pressing the next key
    time.sleep(0.6)
    # Simulate pressing the Escape key
    pyautogui.press('esc')
    print("Notifications Triggered")
else:
    print("Notification blocking is disabled, skipping notification trigger.")
