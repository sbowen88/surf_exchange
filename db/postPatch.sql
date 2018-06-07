UPDATE exchange_products
SET   title = $1,
      description = $2,
      price = $3,
      photo = $4
WHERE id = $5
returning *;