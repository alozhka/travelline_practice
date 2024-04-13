USE HotelManagement

INSERT INTO dbo.room (room_number, room_type, price_per_night, availability)
VALUES
    (110, N'одноместный c балконом', $3.6, 1),
    (200, N'трёхместный без балнона', $8.1, 1),
    (140, N'двухместный', $9.6, 1),
    (140, N'одноместный c телевизором', $2.7, 1)

INSERT INTO dbo.customer (first_name, last_name, email, phone_number)
VALUES
    (N'Анатолий', N'Карпов', N'akarpov1919@mail.ru', '79194802931'),
    (N'Александра', N'Чернышевская', N'chernysh@rambler.ru', '79765550990'),
    (N'Станислав', N'Ямбаршев', N'stasyan2001@gmail.com', '79377777777'),
    (N'Игорь', N'Дмитриев', N'garik@yahoo.com', '79322861919')


INSERT INTO dbo.booking (customer_id, room_id, check_in_date, check_out_date)
VALUES
    (3, 1, '2024-04-11', '2024-04-17'),
    (1, 4, '2024-07-01', '2024-08-17'),
    (2, 2, '2024-05-11', '2024-05-15'),
    (4, 3, '2024-06-21', '2024-06-25')


INSERT INTO dbo.facility (facility_name)
VALUES
    (N'wi-fi'),
    (N'bathroom'),
    (N'conditioner'),
    (N'mini-bar')


INSERT INTO dbo.rooms_to_facilities (room_id, facility_id)
VALUES
    (1, 4),
    (2, 3),
    (3, 1),
    (3, 4),
    (4, 2)
