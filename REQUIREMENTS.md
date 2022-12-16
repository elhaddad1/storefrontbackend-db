# API Requirements
In the project for this course, you will create an API with Node and Postgres that will support an online store front end. This API will do the following:

Allow products to be created and stored in a database
Allow users to sign up and sign in

Require users to be signed in to perform certain actions

Allow users to create orders and add products to orders

## API Endpoints
#### Products
- Index (GET `/api/products` )
- Show (GET `/api/products/:id`)
- Create [token required] (POST `/api/products/create`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)

#### Users
- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)

#### Order
- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create [token required] (POST `/api/orders`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)


#### Order products
- Show [token required] (GET `/api/orderproducts/getByOrderId/:id`)
- Create [token required] (POST `/api/orderproducts/add/`)
- Delete [token required] (DELETE `/api/orderproducts/:id`)
- Delete [token required] (DELETE `/api/orderproducts/deleteByOrderId/:id`)

## Data Shapes
#### Product
The table includes the following fields: 
- id
- name
- price
- category
The SQL schema for this table is as follows: 
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    price numeric DEFAULT 0.00,
    category varchar(50)
)
```

#### User
The table includes the following fields:
- id
- username
- firstName
- lastName
- password
The SQL schema for this table is as follows:
```sql
CREATE TABLE users_tb (
    id SERIAL PRIMARY KEY,
    username varchar(25) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    password_digest varchar
);
```

#### Orders
The table includes the following fields:
- id
- user_id
- status of order (active or complete)
The SQL schema for this table is as follows:
```sql
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
```

#### order_products
The table includes the following fields:
- id
- product_id
- order_id
- quantity
  The SQL schema for this table is as follows:
```sql
CREATE TABLE order_products_tb (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
            REFERENCES orders_tb(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    CONSTRAINT fk_products
        FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON  UPDATE CASCADE
);