SELECT * FROM exchange_products
RIGHT JOIN favorites
ON favorites.product_id = exchange_products.id
WHERE favorites.user_id = $1