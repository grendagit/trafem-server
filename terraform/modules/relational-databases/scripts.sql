CREATE TABLE IF NOT EXISTS end_user (
  id serial PRIMARY KEY,
  email text CONSTRAINT email_col_len CHECK (length(email) <= 2048)
);