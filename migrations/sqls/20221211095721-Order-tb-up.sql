/* Replace with your SQL commands */
CREATE TABLE orders_tb (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status varchar NOT NULL,
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users_tb(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);