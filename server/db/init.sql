\echo 'Creating all necessary tables...'

CREATE TABLE IF NOT EXISTS users (
    username varchar(255) UNIQUE NOT NULL,
    passhash TEXT NOT NULL,
    display_name varchar(255) NOT NULL,
    profile_pic TEXT,
    gender TEXT NOT NULL,
    budget_tier INTEGER NOT NULL CHECK (budget_tier BETWEEN 1 AND 4),
    clean_tier INTEGER NOT NULL CHECK (clean_tier BETWEEN 1 AND 3),
    loud_tier INTEGER NOT NULL CHECK (loud_tier BETWEEN 1 AND 3),
    coed BOOLEAN NOT NULL
)

\echo 'Finished creating all tables'