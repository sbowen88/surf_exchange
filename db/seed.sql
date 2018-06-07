
CREATE TABLE IF NOT EXISTS exchange_users(
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    username VARCHAR(30),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    profile_picture TEXT,
    email VARCHAR(320),
    age VARCHAR(3)
    
);

CREATE TABLE IF NOT EXISTS favorites(
table_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES exchange_users(id),
product_id INTEGER REFERENCES exchange_products(id)
);

--selects favorited posts
SELECT * FROM exchange_products
RIGHT JOIN favorites
ON favorites.product_id = exchange_products.id
WHERE favorites.user_id = 1