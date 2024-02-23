const fs = require('fs');

// Read the JSON file
fs.readFile('database/settings.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const settings = JSON.parse(data);
        
        // Modify the value (for example, incrementing BlackoutTimer)
        settings.BlackoutModeSettings.Timer += 10;

        // Convert the modified object back to JSON format
        const updatedData = JSON.stringify(settings, null, 2);

        // Write the updated JSON back to the file
        fs.writeFile('database/settings.json', updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('JSON file updated successfully.');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});

function triggerBlackoutDurationAnalytic() {
  const data = JSON.parse(fs.readFileSync('database/settings.json', 'utf8'));
  var Duration = data.BlackoutModeSettings.Duration;

  fs.readFile('database/analytics.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const analytics = JSON.parse(data);
        
        // Modify the value (for example, incrementing BlackoutTimer)
        analytics.Blackout.blackoutTime += Duration;

        // Convert the modified object back to JSON format
        const updatedData = JSON.stringify(analytics, null, 2);

        // Write the updated JSON back to the file
        fs.writeFile('database/analytics.json', updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('JSON file updated successfully.');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
}
triggerBlackoutMode();