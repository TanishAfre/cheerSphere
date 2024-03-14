from win10toast import ToastNotifier

def send_notification(title, message):
    toaster = ToastNotifier()
    toaster.show_toast(title, message, duration=10)

if __name__ == "__main__":
    notification_title = "Hello!"
    notification_message = "This is a notification from Python!"
    send_notification(notification_title, notification_message)
