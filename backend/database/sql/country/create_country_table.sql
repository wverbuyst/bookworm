DROP TABLE IF EXISTS country;
CREATE TABLE country (
  country_id UUID NOT NULL,
  country VARCHAR(250) NOT NULL,
  last_updated TIMESTAMP NOT NULL,
  PRIMARY KEY (country_id)
);
