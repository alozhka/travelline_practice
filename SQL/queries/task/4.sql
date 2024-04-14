SELECT 
    b.booking_id,
    b.check_in_date,
    b.check_out_date,
    r.room_number,
    r.room_type,
    r.price_per_night,
    c.first_name,
    c.last_name,
    c.email,
    c.phone_number,
    STRING_AGG(f.facility_name, ', ') AS facilities
FROM 
    booking b
JOIN 
    customer c ON b.customer_id = c.customer_id
JOIN 
    room r ON b.room_id = r.room_id
JOIN 
    rooms_to_facilities rf ON r.room_id = rf.room_id
JOIN 
    facility f ON rf.facility_id = f.facility_id
WHERE 
    c.phone_number = '79377777777'
GROUP BY 
    b.booking_id,
    b.check_in_date,
    b.check_out_date,
    r.room_number,
    r.room_type,
    r.price_per_night,
    c.first_name,
    c.last_name,
    c.email,
    c.phone_number;
