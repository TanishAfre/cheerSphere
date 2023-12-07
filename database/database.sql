-- Database to collect mood data from users
CREATE TABLE UserMood (
    MoodID INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique ID for each entry
    UserID INTEGER,  -- You can link this to a User table if needed
    MoodValue INTEGER CHECK (MoodValue >= 1 AND MoodValue <= 5) NOT NULL, -- 1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good
    EntryDate DATE NOT NULL, -- Date of entry   
    EntryTime TIME NOT NULL -- Time of entry
);

-- table to store calendar events
CREATE TABLE calendarEvents (
    event_id INTEGER PRIMARY KEY, -- Unique ID for each entry
    event_title TEXT NOT NULL, -- title of the event
    event_starting_date DATE  NOT NULL, -- starting date of the event
    event_ending_date DATE  NOT NULL -- ending date of the event
);

-- table to store event notifications
CREATE TABLE eventNotifications (
    notification_ID INTEGER PRIMARY KEY, -- Unique ID for each entry
    event_id INTEGER, -- id of the event
    notification_date DATE NOT NULL, -- date of the notification
    notification_message TEXT NOT NULL, -- message of the notification
    FOREIGN KEY (event_id) REFERENCES calendarEvents(id) -- foreign key to link the event id to the calendarEvents table
);






