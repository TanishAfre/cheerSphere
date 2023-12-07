-- Database to collect mood data from users
CREATE TABLE UserMood (
    MoodID INTEGER PRIMARY KEY AUTOINCREMENT, -- Unique ID for each entry
    UserID INTEGER,  -- You can link this to a User table if needed
    MoodValue INTEGER CHECK (MoodValue >= 1 AND MoodValue <= 5) NOT NULL, -- 1 = Very Bad, 2 = Bad, 3 = Neutral, 4 = Good, 5 = Very Good
    EntryDate DATE NOT NULL, -- Date of entry   
    EntryTime TIME NOT NULL -- Time of entry
);








