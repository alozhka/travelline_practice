SELECT b.* FROM booking b
LEFT JOIN customer c
ON b.customer_id = c.customer_id 
WHERE c.email = 'garik@yahoo.com'
