CREATE TABLE AppUser2(
  DateJoined DATE,
  Loyalty INTEGER,
  PRIMARY KEY (DateJoined)
);

CREATE TABLE AppUser1(
  Email VARCHAR(254),
  Name VARCHAR(50),
  DateJoined DATE,
  PRIMARY KEY (Email),
  FOREIGN KEY (DateJoined) REFERENCES AppUser2 ON DELETE CASCADE
);

CREATE TABLE SaveFileManages(
  FileID INTEGER,
  CreationDate DATE,
  Email VARCHAR(254),
  PRIMARY KEY (FileID, Email),
  FOREIGN KEY (Email) REFERENCES AppUser1 ON DELETE CASCADE
);

CREATE TABLE BadgeLoads2(
  ObedienceLevel INTEGER,
  BadgeName VARCHAR(25),
  PRIMARY KEY (BadgeName)
);

CREATE TABLE BadgeLoads1(
  BadgeID INTEGER,
  BadgeName VARCHAR(25),
  FileID INTEGER,
  Email VARCHAR(254),
  PRIMARY KEY (BadgeID),
  FOREIGN KEY (FileID, Email) REFERENCES SaveFile
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (BadgeName) REFERENCES BadgeLoads2
    ON DELETE CASCADE
    ON UPDATE CASCADE
)


CREATE TABLE LocationFeaturesAccess1(
  Address VARCHAR(25),
  BadgeID INTEGER NOT NULL,
  Title VARCHAR(50) NOT NULL,
  RouteNumber INTEGER,
  PRIMARY KEY (Address),
  FOREIGN KEY (BadgeID) REFERENCES BadgeLoads1
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (RouteNumber) REFERENCES LocationFeaturesAccess3
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (Title) REFERENCES PokemonGameCategorizes1
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE LocationFeaturesAccess2(
  IsRoute BOOLEAN,
  HasTrainers BOOLEAN,
  UNIQUE (HasTrainers),
  PRIMARY KEY (IsRoute)
)

CREATE TABLE LocationFeaturesAccess3(
  RouteNumber INTEGER,
  IsRoute BOOLEAN,
  PRIMARY KEY (RouteNumber),
  FOREIGN KEY (IsRoute) REFERENCES LocationFeaturesAccess2
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE PokemonGameCategorizes1(
  Title VARCHAR(50),
  ReleaseDate DATE,
  GenerationNumber INTEGER NOT NULL,
  PRIMARY KEY (Title),
  FOREIGN KEY (ReleaseDate) REFERENCES PokemonGameCategorizes2
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (GenerationNumber) REFERENCES Generation
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

CREATE TABLE PokemonGameCategorizes2(
  ReleaseDate DATE,
  SalePrice REAL,
  PRIMARY KEY (ReleaseDate)
)

CREATE TABLE Contains(
  PokeID INTEGER NOT NULL,
  Address VARCHAR(25),
  PRIMARY KEY (PokeID, Address)
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Address) REFERENCES LocationFeaturesAccess1
    ON DELETE CASCADE
    ON UPDATE CASCADE
)


CREATE TABLE PokemonStores1(
  PokeID INTEGER,
  PokemonName VARCHAR(25),
  PokemonLevel VARCHAR(25),
  Ability VARCHAR(15),
  Stats INTEGER,
  Type VARCHAR(8),
  FileID INTEGER,
  Email VARCHAR(254),
  PRIMARY KEY (PokeID),
  FOREIGN KEY (PokemonName) REFERENCES PokemonStores2
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (FileID, Email) REFERENCES SaveFile
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE PokemonStores2(
  PokemonName VARCHAR(25),
  Type VARCHAR(8),
  EggGroup VARCHAR(15),
  PRIMARY KEY (PokemonName)
)

CREATE TABLE Evolves(
  PokeIDFrom INTEGER,
  PokeIDTo INTEGER,
  Condition VARCHAR(100),
  PRIMARY KEY (PokeIDFrom, PokeIDTo),
  FOREIGN KEY (PokeIDFrom) REFERENCES PokemonStores1 (PokeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeIDTo) REFERENCES PokemonStores1 (PokeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE Parent(
  MoveName VARCHAR(25) NOT NULL,
  PokeID INTEGER,
  PRIMARY KEY (MoveName, PokeID),
  FOREIGN KEY (MoveName) REFERENCES EggMove
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE Uses(
  MoveName VARCHAR(25) NOT NULL,
  PokeID INTEGER,
  PRIMARY KEY (MoveName, PokeID),
  FOREIGN KEY (MoveName) REFERENCES Move
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE Move1(
  Accuracy INTEGER,
  Power INTEGER,
  PP INTEGER,
  Type VARCHAR(8),
  Function VARCHAR(15),
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName)
  FOREIGN KEY (Function) REFERENCES Move2
    ON DELETE SET NULL
    ON UPDATE CASCADE,
)

CREATE TABLE Move2(
  Function VARCHAR(15),
  CanMiss BOOLEAN,
  PRIMARY KEY (Function)
)

CREATE TABLE EggMove(
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE LevelMove(
  MoveName VARCHAR(25),
  UnlockLevel INTEGER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE TMHMMove(
  MoveName VARCHAR(25),
  Number INTEGER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

CREATE TABLE TutorMoveTeaches(
  MoveName VARCHAR(25),
  Price VARCHAR(25),
  Address VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move,
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Address) REFERENCES LocationFeaturesAccess1
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

CREATE TABLE Generation(
  GenerationNumber INTEGER,
  Console VARCHAR(25),
  PRIMARY KEY (GenerationNumber)
)







8. INSERT statements to populate each table with at least 5 tuples. You will likely want to
have more than 5 tuples so that you can have meaningful queries later.

SET DATEFORMAT dmy;

INSERT INTO AppUser1(Email, Name, DateJoined)
VALUES	(‘111@gmail.com’, ‘Ash’, ‘01.05.2022’),
(‘222@gmail.com’, ‘Ash’, ‘01.05.2022’),
(‘333@gmail.com’, ‘Wash’, ‘12.05.1999’),
(‘444@gmail.com’, ‘epicman’, ‘06.20.2000’),
(‘555@gmail.com’, ‘555’, ‘10.01.2023’);

INSERT INTO AppUser2(DateJoined, Loyalty)
VALUES 	(‘01.05.2022’, 2),
(‘01.06.2022’, 2),
(‘12.05.1999’, 25),
(‘06.20.2000’, 24),
(‘10.01.2023’, 1);

INSERT INTO SaveFileManages(FileID, CreationDate, Email)
VALUES 	(1, ‘01.05.2022’, ‘111@gmail.com’),
(2, ‘01.05.2022’, ‘111@gmail.com’),
(1, ‘12.05.1999’, ‘222@gmail.com’),
(1, ‘06.20.2000’, ‘444@gmail.com’),
(1, ‘10.01.2023’, ‘555@gmail.com’);

INSERT INTO BadgeLoads1(BadgeID, BadgeName, FileID, Email)
VALUES 	(1, ‘Cascade’, 1, ‘111@gmail.com’),
		(2, ‘Rock’, 3, ‘abc@gmail.com’),
		(3, ‘Rainbow’, 2, ‘123@gmail.com’),
		(4, ‘Cascade’, 1, ‘111@gmail.com’),
		(5, ‘Cascade’, 6, ‘555@gmail.com’);

INSERT INTO BadgeLoads2(BadgeName, ObedienceLevel)
VALUES 	(‘Cascade’, 15),
		( ‘Rock’, 25),
		(‘Rainbow’, 100),
		( ‘Spectre’, 60),
		( ‘Blaze’, 25);





INSERT INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber)
VALUES 	('6200 University Blvd’, 1, ‘Scarlet and Violet’, 1),
		('1860 E Mall #301’, 2, ‘Brilliant Diamond’, 2),
		('6133 University Blvd’, 3, ‘Legends Arceus’, 3),
		('6138 Student Union Blvd’, 4, ‘Unite’, 4),
		('2053 Main Mall’, 5, ‘Shining Pearl’, -1);

INSERT INTO LocationFeaturesAccess2(IsRoute, HasTrainer)
VALUES 	(TRUE, TRUE),
		(FALSE, FALSE);

INSERT INTO LocationFeaturesAccess3(RouteNumber, IsRoute)
VALUES 	(1, TRUE),
		(2, TRUE),
		(3, TRUE),
		(4, TRUE),
		(-1, FALSE);

INSERT INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber)
VALUES 	(‘Scarlet and Violet’, ‘01.05.2022’, 1),
(‘Brilliant Diamond’, ‘01.06.2022’, 2),
(‘Legends Arceus’, ‘12.05.1999’, 3),
(‘Unite’, ‘06.20.2000’, 4),
(‘Shining Pearl’, ‘10.01.2023’, 5);

INSERT INTO PokemonGameCategorizes2(ReleaseDate, SalePrice)
VALUES 	(‘01.05.2022’, 50.50),
(‘01.06.2022’, 50.55),
(‘12.05.1999’, 31.31),
(‘06.20.2000’, 24.00),
(‘10.01.2023’, 57.99);

INSERT INTO Contains(Address, PokeID)
VALUES 	('6200 University Blvd’, 1),
		('1860 E Mall #301’, 2),
		('6200 University Blvd’, 3),
		('6138 Student Union Blvd’, 4),
		('2053 Main Mall’, 5);






INSERT INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email)
VALUES 	(1, Charizard, 7, ‘fly’, 313131313131, 1, ‘555@gmail.com’),
(2, Pikachu, 77, ‘rizz’, 310031293105, 2, ‘111@gmail.com’),
(3, Squirtle, 777, ‘dance’, 312131093100, 1, ‘222@gmail.com’),
(4, Wartortle, 16, ‘float’, 310031003100, 1, ‘222@gmail.com’),
(5, Raichu, 771, ‘throw’, 310031003111, 2, ‘111@gmail.com’),
(6, Charmander, 420, ‘punch’, 000000000000, 1, ‘555@gmail.com’),
(7, Charmeleon, 8, ‘think’, 001122300011, 1, ‘555@gmail.com’),
(8, Blastoise, 36, ‘spray’, 100000000000, 1, ‘222@gmail.com’);

INSERT INTO PokemonStores2(PokemonName, Type, EggGroup)
VALUES 	(Charizard, ‘Fire’, ‘Dragon’),
(Pikachu, ‘Electric’, ‘Fairy’),
(Squirtle, ‘Water’, ‘Water1’),
(Wartortle, ‘Water’, ‘Water1’),
(Raichu, ‘Electric’, ‘Fairy’),
(Charmander, ‘Fire’, ‘Dragon’),
(Charmeleon, ‘Fire’, ‘Dragon’),
(Blastoise, ‘Water’, ‘Water1’);

INSERT INTO TutorMoveTeaches(MoveName, Price, Address)
VALUES 	(‘Counter’, ‘1 Diamond’, ‘6200 University Blvd’),
(‘Body Slam’, ‘3 Gold’, '1860 E Mall #301’),
(‘Explosion’, ‘2 Bronze’, '6133 University Blvd’),
(‘Mega Kick’, ‘7 Bronze’, '6138 Student Union Blvd’),
(‘Mimic’, ‘4 Dirt’, '2053 Main Mall’);

INSERT INTO Evolves(PokeIDfrom, PokeIDto, Condition)
VALUES 	(1, 6, ‘eats some food’),
		(2, 5, ‘goes to therapy’),
		(3, 4, ‘swims a bit’),
		(7, 6, ‘starts a fire’),
		(4, 8, ‘learns to swim’);

INSERT INTO Parent(MoveName, PokeID)
VALUES 	(‘Counter’, 1),
(‘Body Slam’, 2),
(‘Explosion’, 3),
(‘Mega Kick’, 4),
(‘Mimic’, 5),
(‘Pound’, 6),
(‘Karate Chop’, 7),
(‘Scratch’, 8);

INSERT INTO Uses(MoveName, PokeID)
VALUES 	(‘Counter’, 1),
(‘Counter’, 2),
(‘Counter’, 3),
(‘Counter’, 4),
(‘Counter’, 5),
(‘Counter’, 6),
(‘Counter’, 7),
(‘Counter’, 8);

INSERT INTO Move1(Accuracy, Power, PP, Type, Function, MoveName)
VALUES 	(100, 100, 15, ‘Fire’, ‘Special’, ‘Flamethrower’),
		(85, 120, 10, ‘Rock’, ‘Physical’, ‘Stone Edge’),
		(100, 0, 15, ‘Psychic’, ‘Status’, ‘Calm Mind’),
		(100, 0, 15, ‘Normal’, ‘Status’, ‘Swords Dance’),
		(100, 40, 25, ‘Dragon’, ‘Special’, ‘Dragon Rage’);

INSERT INTO Move2(Function, CanMiss)
VALUES	(‘Status’, FALSE),
		(‘Physical’, TRUE),
		(‘Special’, TRUE);

INSERT INTO Generation(GenerationNumber, Console)
VALUES	(1, ‘GameBoy’),
		(2, ‘GameBoy’),
		(3, ‘GameBoy Advance’),
		(4, ‘Nintendo DS’),
		(9, ‘Nintendo Switch’);

INSERT INTO TMHMMove(MoveName, Number)
VALUES 	(‘Bullet Seed’, 9),
		(‘Sunny Day’, 11),
		(‘Endure’, 58),
		(‘Rock Slide’, 80),
		(‘Cut’, 1);

INSERT INTO LevelMove(MoveName, UnlockLevel)
VALUES	(‘Flamethrower’, 60),
		(‘Water Gun’, 6),
		(‘Rock Throw’, 60),
		(‘Grass Knot’, 25),
		(‘Ancient Power’, 34);

INSERT INTO EggMove(MoveName)
VALUES	(‘Counter’),
(‘Body Slam’),
(‘Explosion’),
(‘Mega Kick’),
(‘Mimic’),
(‘Pound’),
(‘Karate Chop’),
(‘Scratch’);
