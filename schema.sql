DROP TABLE IF EXISTS My_Movies;

CREATE TABLE IF NOT EXISTS My_Movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    overview VARCHAR(10000),
    media_type VARCHAR(255),
    comment VARCHAR(10000)
);

