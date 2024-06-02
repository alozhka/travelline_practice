SELECT b.*
FROM 
    booking b
JOIN 
    customer c ON b.customer_id = c.customer_id
WHERE 
    c.first_name = 'Aalexandra' OR c.email = 'garik@yahoo.com'
