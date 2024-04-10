-- Проверяем что такой таблице еще нет в БД
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='theater')
    -- Создаем таблицу с театрами
    CREATE TABLE dbo.theater (
	    -- Id театра, с типом данных INT, Identity(1,1), не может быть NULL!
        id_theater INT IDENTITY(1,1) NOT NULL,

		-- Имя театра, с типом данных NVARCHAR(50), не может быть NULL!
        name NVARCHAR(50) NOT NULL,
		address NVARCHAR(50) NOT NULL,
		phone NVARCHAR(50) NOT NULL,
		director NVARCHAR(50) NOT NULL,

		-- Ограничение PRIMARY KEY
		CONSTRAINT PK_theater_id_theater PRIMARY KEY (id_theater)
    )

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='play')
    CREATE TABLE dbo.play (
        id_play INT IDENTITY(1,1) NOT NULL,
        name NVARCHAR(50) NOT NULL,				
		stage_director NVARCHAR(50) NOT NULL,
		id_theater INT NOT NULL,
		CONSTRAINT PK_play_id_play PRIMARY KEY (id_play),

		-- Ограничение FOREIGN KEY
		-- Мы хотим быть уверены, что ссылаемся на сущ-ий театр при создании Выступления
		CONSTRAINT FK_play_id_theater
		  FOREIGN KEY (id_theater) REFERENCES box_office.dbo.theater (id_theater)
    )
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='composition')
    CREATE TABLE dbo.composition (
        id_composition INT IDENTITY(1,1) NOT NULL,
        name NVARCHAR(50) NOT NULL,				
		author NVARCHAR(50) NOT NULL,
		type NVARCHAR(50) NOT NULL
		CONSTRAINT PK_composition_id_composition PRIMARY KEY (id_composition)		
    )
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='composition_to_play')
    CREATE TABLE dbo.composition_to_play (
		id_composition INT NOT NULL,
		id_play INT NOT NULL,	
		CONSTRAINT PK_composition_to_play PRIMARY KEY (id_composition, id_play),
		CONSTRAINT FK_composition_to_play_composition
		    FOREIGN KEY (id_composition) REFERENCES box_office.dbo.composition (id_composition),
        CONSTRAINT FK_composition_to_play_play
		    FOREIGN KEY (id_play) REFERENCES box_office.dbo.play (id_play)
    )
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='actor')
    CREATE TABLE dbo.actor (
        id_actor INT IDENTITY(1,1) NOT NULL,
        name NVARCHAR(50) NOT NULL,
		age TINYINT,
		phone_number NVARCHAR(50) NOT NULL,
		CONSTRAINT PK_actor_id_actor PRIMARY KEY (id_actor)		
    )
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='play_to_actor')
    CREATE TABLE dbo.play_to_actor (
        id_play INT NOT NULL,
		id_actor INT NOT NULL        
		CONSTRAINT PK_play_to_actor PRIMARY KEY (id_play, id_actor),		
        CONSTRAINT FK_play_to_actor_play
		    FOREIGN KEY (id_play) REFERENCES box_office.dbo.play (id_play),
        CONSTRAINT FK_play_to_actor_actor
		    FOREIGN KEY (id_actor) REFERENCES box_office.dbo.actor (id_actor)
    )
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ticket')
    CREATE TABLE dbo.ticket (
        id_ticket INT IDENTITY(1,1) NOT NULL,
        price INT NOT NULL,				
		room_type NVARCHAR(50) NOT NULL,
		place_number INT NOT NULL,
		id_play INT NOT NULL,
		starting_date DATETIME NOT NULL,
		CONSTRAINT PK_ticket_id_ticket PRIMARY KEY (id_ticket),
		CONSTRAINT FK_ticket_play
		    FOREIGN KEY (id_play) REFERENCES box_office.dbo.play (id_play)
    )
GO