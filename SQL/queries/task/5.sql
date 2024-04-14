SELECT 
    r.room_id,
    r.room_number,
    r.room_type,
    r.price_per_night,
    STRING_AGG(f.facility_name, ', ') AS facilities
FROM 
    room r
JOIN 
    booking b ON b.room_id = r.room_id
JOIN 
    rooms_to_facilities rf ON r.room_id = rf.room_id
JOIN 
    facility f ON rf.facility_id = f.facility_id
WHERE 
    ('2024-04-14' NOT BETWEEN b.check_in_date AND b.check_out_date)
    AND
    r.availability = 1
GROUP BY 
    b.check_in_date,
    b.check_out_date,
    r.room_id,
    r.room_number,
    r.room_type,
    r.price_per_night;
