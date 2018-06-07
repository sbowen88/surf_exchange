UPDATE exchange_users
SET   first_name = $1,
      last_name = $2,
      username = $3,
      email = $4
WHERE id = $5
returning *;