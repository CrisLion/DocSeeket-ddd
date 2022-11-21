CREATE TABLE IF NOT EXISTS countries (
  id VARCHAR(2) NOT NULL,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_countries_name(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS states (
  id VARCHAR(4) NOT NULL,
  name VARCHAR(45) NOT NULL,
  country_id VARCHAR(2) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_states_name_country_id(name, country_id),
  KEY IX_states_country_id(country_id),
  CONSTRAINT FK_states_country_id FOREIGN KEY(country_id) REFERENCES countries(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS cities (
  id VARCHAR(6) NOT NULL,
  name VARCHAR(45) NOT NULL,
  state_id VARCHAR(4) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_cities_name_state_id(name, state_id),
  KEY IX_cities_state_id(state_id),
  CONSTRAINT FK_cities_state_id FOREIGN KEY(state_id) REFERENCES states(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS streets (
  id VARCHAR(8) NOT NULL,
  name VARCHAR(45) NOT NULL,
  city_id VARCHAR(2) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_streets_name_city_id(name, city_id),
  KEY IX_streets_city_id(city_id),
  CONSTRAINT FK_streets_city_id FOREIGN KEY(city_id) REFERENCES cities(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;