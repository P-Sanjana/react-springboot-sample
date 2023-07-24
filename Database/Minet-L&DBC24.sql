CREATE TABLE `currencies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('CRYPTO', 'CASH') NOT NULL,
  `name` varchar(20) UNIQUE NOT NULL,
  `code` varchar(5) UNIQUE NOT NULL,
  `logo_image_url` varchar(256) NOT NULL,
  `color` varchar(7),
  `about` varchar(500) NOT NULL,
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `currency_price_history` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `currency_id` int,
  `price_usd` double NOT NULL,
  `market_cap_usd` double,
  `vol_24h` double,
  `circulating_supply` bigint,
  `history_dt` datetime NOT NULL,
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email_id` varchar(256) UNIQUE NOT NULL,
  `contact_num` varchar(15) NOT NULL,
  `avatar_img_url` varchar(256),
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `users_watchlist` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `currency_id` int NOT NULL,
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `users_wallet` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `currency_id` int,
  `balance` float NOT NULL DEFAULT 0,
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `users_wallet_transactions` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `wallet_id` bigint NOT NULL,
  `type` ENUM ('DEPOSIT', 'WITHDRAW', 'BUY', 'SELL') NOT NULL,
  `amount_usd` float NOT NULL,
  `participant_name` varchar(41) COMMENT 'For type buy/sell',
  `currency_id` int COMMENT 'Used for type buy/sell',
  `currency_amount` double COMMENT 'Used for type buy/sell',
  `status` ENUM ('PROCESSED', 'IN_PROGRESS', 'FAILED') NOT NULL DEFAULT "IN_PROGRESS",
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

CREATE TABLE `users_portfolio_history` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `currency_id` int NOT NULL COMMENT 'Currency type of crypto',
  `invested_amount_usd` float NOT NULL,
  `current_amount_usd` float NOT NULL,
  `change_percent` float NOT NULL DEFAULT 0,
  `history_dt` datetime NOT NULL,
  `created_by` varchar(10),
  `created_dt` datetime NOT NULL,
  `modified_by` varchar(10),
  `modified_dt` datetime
);

ALTER TABLE `currency_price_history` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`);

ALTER TABLE `users_watchlist` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_watchlist` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`);

ALTER TABLE `users_wallet` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_wallet` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`);

ALTER TABLE `users_wallet_transactions` ADD FOREIGN KEY (`wallet_id`) REFERENCES `users_wallet` (`id`);

ALTER TABLE `users_wallet_transactions` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`);

ALTER TABLE `users_portfolio_history` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_portfolio_history` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`);

CREATE INDEX `user_wallet_index` ON `users_wallet` (`user_id`, `currency_id`);

CREATE INDEX `user_portfolio_index` ON `users_portfolio_history` (`user_id`, `currency_id`);
