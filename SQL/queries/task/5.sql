SELECT r.*
FROM 
    room r
JOIN 
    booking b ON b.room_id = r.room_id
WHERE 
    ('2024-04-14' NOT BETWEEN b.check_in_date AND b.check_out_date) AND
    r.availability = 1
