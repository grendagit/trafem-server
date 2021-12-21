CREATE TABLE IF NOT EXISTS end_user (
  id serial PRIMARY KEY,
  email text CONSTRAINT email_col_len CHECK (length(email) <= 2048)
);

CREATE TABLE IF NOT EXISTS end_user_profile (
  end_user_id int PRIMARY KEY REFERENCES end_user (id) ON DELETE CASCADE,
  given_name text NOT NULL,
  family_name text NOT NULL
);

CREATE TYPE t_event_type AS ENUM ('trip', 'party');

CREATE TABLE IF NOT EXISTS event (
  id serial PRIMARY KEY,
  end_user_id int NOT NULL REFERENCES end_user (id) ON DELETE CASCADE,
  event_type t_event_type NOT NULL,
  longitude numeric(6, 4) NOT NULL CONSTRAINT longitude_range CHECK (
    longitude >= - 180
    AND longitude <= 180
  ),
  latitude numeric(6, 4) NOT NULL CONSTRAINT latitude_range CHECK (
    latitude >= - 90
    AND latitude <= 90
  ),
  title varchar(64) NOT NULL,
  description text NOT NULL,
  participation_price_min int,
  participation_price_max int NOT NULL,
  duration_from timestamp,
  duration_to timestamp NOT NULL,
  created_at timestamp NOT NULL
);