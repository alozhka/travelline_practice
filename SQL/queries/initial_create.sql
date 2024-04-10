IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='room')
    CREATE TABLE 'room' (
        room_id INT IDENTITY(1, 1) NOT NULL,
        room_number INT NOT NULL
        room_type NVARCHAR(50) NOT NULL,
        price_per_night MONEY NOT NULL,
        availability BIT NOT NULL,

        CONSTRAINT PK_room_id PRIMARY KEY (room_id)
    )

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='customer')
    CREATE TABLE 'customer' (
        customer_id INT IDENTITY(1, 1) NOT NULL,
        first_name NVARCHAR(50) NOT NULL,
        last_name NVARCHAR(50) NOT NULL,
        email NVARCHAR(50) NOT NULL,
        phone_number NVARCHAR(11) NOT NULL,

        CONSTRAINT PK_customer_id PRIMARY KEY (room_id)
    )

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='booking')
    CREATE TABLE 'booking' (
        booking_id INT IDENTITY(1, 1) NOT NULL,
        customer_id INT NOT NULL,
        room_id INT NOT NULL,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,

        CONSTRAINT PK_booking_id PRIMARY KEY (booking_id),
        CONSTRAINT FK_booking_customer 
            FOREIGN KEY (customer_id) REFERENCES HotelManagement.dbo.customer (customer_id),
        CONSTRAINT FK_booking_room 
            FOREIGN KEY (room_id) REFERENCES HotelManagement.dbo.room (room_id)
    )

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='facility')
    CREATE TABLE 'facility' (
        facility_id INT IDENTITY(1, 1) NOT NULL,
        facility_name NVARCHAR(50) NOT NULL,

        CONSTRAINT PK_facility_id PRIMARY KEY (facility_id)
    )

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='facility')
    CREATE TABLE 'facility' (
        facility_id INT IDENTITY(1, 1) NOT NULL,
        facility_name NVARCHAR(50) NOT NULL,

        CONSTRAINT PK_facility_id PRIMARY KEY (facility_id)
    )
