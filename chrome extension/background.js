chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'readFocusMode') {
        readFocusMode(sendResponse);
        return true; // Keep the message channel open for asynchronous response
    }
    if (request.action === 'readWebsites') {
        readWebsites(sendResponse);
        return true; 
    }
});

function readFocusMode(sendResponse) {
    chrome.runtime.getPackageDirectoryEntry(function (rootDir) {
        rootDir.getFile('database/focusmode.txt', {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    var fileContent = e.target.result;
                    sendResponse({ data: fileContent });
                };

                reader.readAsText(file);
            }, errorHandler);
        }, errorHandler);
    });
}


function readWebsites(sendResponse) {
    chrome.runtime.getPackageDirectoryEntry(function (rootDir) {
        rootDir.getFile('database/websites.txt', {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    var fileContent = e.target.result;
                    sendResponse({ data: fileContent });
                };

                reader.readAsText(file);
            }, errorHandler);
        }, errorHandler);
    });
}




function readSQLDatabase(sendResponse) {
    chrome.runtime.getPackageDirectoryEntry(function (rootDir) {
        rootDir.getFile('data.db', {}, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    var arrayBuffer = e.target.result;

                    // Create a Uint8Array from the array buffer
                    var uint8Array = new Uint8Array(arrayBuffer);

                    // Initialize an SQL.js database using the uint8Array
                    var SQL = require('sql.js');
                    var db = new SQL.Database(uint8Array);

                    // Replace 'your_table_name' with the actual table name you want to query
                    var tableName = 'focusmode';

                    // Execute a query on the specified table
                    var result = db.exec('SELECT * FROM ' + tableName);

                    // Send the result back as a response
                    console.log(result);
                    sendResponse({ data: result });
                };

                reader.readAsArrayBuffer(file);
            }, errorHandler);
        }, errorHandler);
    });
}

function errorHandler(error) {
    console.error('Error reading file:', error);
}
