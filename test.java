import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;

public class InstallChromeExtension {
    public static void main(String[] args) {
        // Set the path to the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");

        // Specify the path to the Chrome extension directory (unpacked extension)
        String extensionPath = "/path/to/your/extension";

        // Create ChromeOptions and add the extension
        ChromeOptions options = new ChromeOptions();
        options.addArguments("load-extension=" + extensionPath);

        // Launch ChromeDriver with ChromeOptions
        WebDriver driver = new ChromeDriver(options);

        // Navigate to a test page or perform other actions as needed

        // Close the browser
        driver.quit();
    }
}
