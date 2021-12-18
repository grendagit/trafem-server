CREATE TABLE IF NOT EXISTS end_user (
  id serial PRIMARY KEY,
  email text CONSTRAINT email_col_len CHECK (length(email) <= 2048)
);

CREATE TYPE t_event_type AS ENUM ('trip', 'party');

CREATE TABLE IF NOT EXISTS event (
  id serial PRIMARY KEY,
  end_user_id int NOT NULL REFERENCES end_user(id) ON DELETE CASCADE,
  event_type t_event_type NOT NULL,
  longitude numeric(2) NOT NULL CONSTRAINT longitude_range CHECK (
    longitude >= -180
    AND longitude <= 180
  ),
  latitude numeric(2) NOT NULL CONSTRAINT latitude_range CHECK (
    latitude >= -90
    AND latitude <= 90
  )
);