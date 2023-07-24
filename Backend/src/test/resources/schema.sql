CREATE TABLE IF NOT EXISTS currencies (
  id int PRIMARY KEY AUTO_INCREMENT,
  type ENUM ('CRYPTO', 'CASH') NOT NULL,
  name varchar(20) UNIQUE NOT NULL,
  code varchar(5) UNIQUE NOT NULL,
  logo_image_url varchar(256) NOT NULL,
  color varchar(7),
  about varchar(500),
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS currency_price_history (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  currency_id int,
  price_usd double NOT NULL,
  market_cap_usd double,
  vol_24h double,
  circulating_supply bigint,
  history_dt timestamp NOT NULL,
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS users (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  email_id varchar(256) UNIQUE NOT NULL,
  contact_num varchar(15) NOT NULL,
  avatar_img_url varchar(256),
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS users_watchlist (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  user_id bigint NOT NULL,
  currency_id int NOT NULL,
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS users_wallet (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  user_id bigint,
  currency_id int,
  balance float NOT NULL DEFAULT 0,
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS users_wallet_transactions (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  wallet_id bigint NOT NULL,
  type ENUM ('DEPOSIT', 'WITHDRAW', 'BUY', 'SELL') NOT NULL,
  amount_usd float NOT NULL,
  participant_name varchar(41),
  currency_id int,
  currency_amount double,
  status ENUM ('PROCESSED', 'IN_PROGRESS', 'FAILED') NOT NULL DEFAULT 'IN_PROGRESS',
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

CREATE TABLE IF NOT EXISTS users_portfolio_history (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  user_id bigint NOT NULL,
  currency_id int NOT NULL,
  invested_amount_usd float NOT NULL,
  current_amount_usd float NOT NULL,
  change_percent float NOT NULL DEFAULT 0,
  history_dt timestamp NOT NULL,
  created_by varchar(10),
  created_dt timestamp NOT NULL,
  modified_by varchar(10),
  modified_dt timestamp
);

ALTER TABLE currency_price_history ADD FOREIGN KEY (currency_id) REFERENCES currencies (id);

ALTER TABLE users_watchlist ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE users_watchlist ADD FOREIGN KEY (currency_id) REFERENCES currencies (id);

ALTER TABLE users_wallet ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE users_wallet ADD FOREIGN KEY (currency_id) REFERENCES currencies (id);

ALTER TABLE users_wallet_transactions ADD FOREIGN KEY (wallet_id) REFERENCES users_wallet (id);

ALTER TABLE users_wallet_transactions ADD FOREIGN KEY (currency_id) REFERENCES currencies (id);

ALTER TABLE users_portfolio_history ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE users_portfolio_history ADD FOREIGN KEY (currency_id) REFERENCES currencies (id);

CREATE INDEX IF NOT EXISTS user_wallet_index ON users_wallet (user_id, currency_id);

CREATE INDEX IF NOT EXISTS user_portfolio_index ON users_portfolio_history (user_id, currency_id);
