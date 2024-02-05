import pyautogui
import time

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
