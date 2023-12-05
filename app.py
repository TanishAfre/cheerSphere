from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def load_extension(extension_path):
    chrome_options = Options()
    # You can add other options as needed
    chrome_options.add_argument('--start-maximized')
    chrome_options.add_extension(extension_path)

    driver = webdriver.Chrome(options=chrome_options)
    return driver


# Replace 'path/to/your/extension' with the actual path to your extension directory
extension_path = 'chrome extension'
driver = load_extension(extension_path)

# Example: Open a website to test the extension
driver.get('https://example.com')

# Your code here to interact with the extension

# Close the browser window when done
driver.quit()
