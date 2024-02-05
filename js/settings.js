const fs = require('fs');
const path = require('path');

function removeApplicationIPC(appName) {
    const blockedAppsFile = path.join(__dirname, '../database/apps.txt');

    // Read the current list of blocked applications from the file
    fs.readFile(blockedAppsFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading blocked applications file:', err);
            return;
        }

        // Remove the specified application from the list
        const updatedApps = data
            .split('\n')
            .filter(app => app.trim() !== appName);

        // Write the updated list back to the file
        fs.writeFile(blockedAppsFile, updatedApps.join('\n'), 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing blocked applications file:', writeErr);
                return;
            }

            // Update the UI after successful removal
            renderBlockedApplications();
        });
    });
}
