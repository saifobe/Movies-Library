DROP TABLE IF EXISTS My_Movies;

CREATE TABLE IF NOT EXISTS My_Movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    vote_average VARCHAR(255),
    summary VARCHAR(10000),
    media_type VARCHAR(255)
);

