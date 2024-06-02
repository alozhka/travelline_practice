SELECT r.*
FROM 
    room r
JOIN
    booking b ON b.room_id = r.room_id
WHERE
    r.room_id NOT IN (SELECT b.room_id FROM booking b WHERE GETDATE() BETWEEN b.check_in_date AND b.check_out_date) AND
    r.availability = 1
