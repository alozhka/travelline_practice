SELECT b.*
FROM 
    booking b
JOIN
    room r ON b.room_id = r.room_id
WHERE 
    r.room_number = 200
