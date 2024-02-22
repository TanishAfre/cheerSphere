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

function triggerBlackoutMode() {
    // Read the current contents of the file
    fs.readFile('database/analytics.json', 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }

      // Parse the JSON data
      let jsonData = JSON.parse(data);

      // Increment the blackoutAmount
      jsonData.Blackout.blackoutAmount += 1;

      // Convert the updated object back to a JSON string
      const updatedData = JSON.stringify(jsonData, null, 2); // The second argument null and 2 for pretty-printing

      // Write the updated data back to the file
      fs.writeFile('database/analytics.json', updatedData, 'utf8', (err) => {
        if (err) {
          console.error("Error writing to the file:", err);
          return;
        }
        console.log("Successfully updated blackoutAmount.");
      });
    });
  }

  triggerBlackoutMode();