INSERT INTO
  end_user (email)
VALUES
  ('test@test.com');

INSERT INTO
  end_user_profile (end_user_id, given_name, family_name)
VALUES
  (1, 'imię', 'nazwisko');

INSERT INTO
  event (
    end_user_id,
    event_type,
    longitude,
    latitude,
    title,
    description,
    participation_price_min,
    participation_price_max,
    duration_from,
    duration_to,
    created_at
  )
VALUES
  (
    1,
    'trip',
    21.0333,
    52.2167,
    'Niech zawsze będzie słońce!',
    'Musisz wpaść na moją imprezę! Zapewniam świetną miejscówkę, dobrą muzykę i przekąski. Zaczynamy o 20! Osoby towarzyszące mile widziane.',
    0,
    100,
    '2022-05-01' :: timestamp,
    '2022-05-03' :: timestamp,
    CURRENT_TIMESTAMP
  );

INSERT INTO
  event (
    end_user_id,
    event_type,
    longitude,
    latitude,
    title,
    description,
    participation_price_min,
    participation_price_max,
    duration_from,
    duration_to,
    created_at
  )
VALUES
  (
    1,
    'party',
    19.9500,
    50.0667,
    'Sylwester w Krakowie',
    'Rok 2022 czas zacząć! Z tej Okazji chciałbym zaprosić Was na fantastyczną zabawę, podczas której będziemy witać Nowy Rok. Nie może Cię zabraknąć!',
    100,
    1000,
    '2021-12-30' :: timestamp,
    '2022-01-02' :: timestamp,
    CURRENT_TIMESTAMP
  );

INSERT INTO
  event (
    end_user_id,
    event_type,
    longitude,
    latitude,
    title,
    description,
    participation_price_min,
    participation_price_max,
    duration_to,
    created_at
  )
VALUES
  (
    1,
    'trip',
    19.9667,
    49.3000,
    'Zakopane i wiele innych',
    'Dlaczego warto spędzić urlop w Zakopanem z nami? Góry są piękne o każdej porze roku, lecz góry pokryte śniegiem mają w sobie coś magicznego.',
    1000,
    10000,
    '2022-01-06' :: timestamp,
    CURRENT_TIMESTAMP
  );