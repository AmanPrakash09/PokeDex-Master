CREATE TABLE AppUser1(
  Email VARCHAR(254),
  Name VARCHAR(50),
  DateJoined DATE,
  PRIMARY KEY (Email),
  FOREIGN KEY (DateJoined) REFERENCES AppUser2(DateJoined) ON DELETE CASCADE
);

CREATE TABLE AppUser2(
  DateJoined DATE,
  Loyalty NUMBER,
  PRIMARY KEY (DateJoined)
);

CREATE TABLE SaveFileManages(
  FileID NUMBER,
  CreationDate DATE,
  Email VARCHAR(254),
  PRIMARY KEY (FileID, Email),
  FOREIGN KEY (Email) REFERENCES AppUser1(Email) ON DELETE CASCADE
);

CREATE TABLE BadgeLoads1(
  BadgeID NUMBER,
  BadgeName VARCHAR(25),
  FileID NUMBER,
  Email VARCHAR(254),
  PRIMARY KEY (BadgeID),
  FOREIGN KEY (FileID, Email) REFERENCES SaveFileManages(FileID, Email) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (BadgeName) REFERENCES BadgeLoads2(BadgeName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE BadgeLoads2(
  ObedienceLevel NUMBER,
  BadgeName VARCHAR(25),
  PRIMARY KEY (BadgeName)
);

CREATE TABLE LocationFeaturesAccess1(
  Address VARCHAR(25),
  BadgeID NUMBER NOT NULL,
  Title VARCHAR(50) NOT NULL,
  RouteNumber NUMBER,
  PRIMARY KEY (Address),
  FOREIGN KEY (BadgeID) REFERENCES BadgeLoads1(BadgeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (RouteNumber) REFERENCES LocationFeaturesAccess3(RouteNumber) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (Title) REFERENCES PokemonGameCategorizes1(Title) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE LocationFeaturesAccess2(
  IsRoute CHAR(1),
  HasTrainers CHAR(1),
  CONSTRAINT unique_has_trainers UNIQUE (HasTrainers),
  PRIMARY KEY (IsRoute)
);

CREATE TABLE LocationFeaturesAccess3(
  RouteNumber NUMBER,
  IsRoute CHAR(1),
  PRIMARY KEY (RouteNumber),
  FOREIGN KEY (IsRoute) REFERENCES LocationFeaturesAccess2(IsRoute) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PokemonGameCategorizes1(
  Title VARCHAR(50),
  ReleaseDate DATE,
  GenerationNumber NUMBER NOT NULL,
  PRIMARY KEY (Title),
  FOREIGN KEY (ReleaseDate) REFERENCES PokemonGameCategorizes2(ReleaseDate) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (GenerationNumber) REFERENCES Generation(GenerationNumber) 
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE PokemonGameCategorizes2(
  ReleaseDate DATE,
  SalePrice FLOAT,
  PRIMARY KEY (ReleaseDate)
);

CREATE TABLE Contains(
  PokeID NUMBER NOT NULL,
  Address VARCHAR(25),
  PRIMARY KEY (PokeID, Address),
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Address) REFERENCES LocationFeaturesAccess1(Address) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PokemonStores1(
  PokeID NUMBER,
  PokemonName VARCHAR(25),
  PokemonLevel VARCHAR(25),
  Ability VARCHAR(15),
  Stats NUMBER,
  Type VARCHAR(8),
  FileID NUMBER,
  Email VARCHAR(254),
  PRIMARY KEY (PokeID),
  FOREIGN KEY (PokemonName) REFERENCES PokemonStores2(PokemonName) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (FileID, Email) REFERENCES SaveFileManages(FileID, Email) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PokemonStores2(
  PokemonName VARCHAR(25),
  Type VARCHAR(8),
  EggGroup VARCHAR(15),
  PRIMARY KEY (PokemonName)
);

CREATE TABLE Evolves(
  PokeIDFrom NUMBER,
  PokeIDTo NUMBER,
  Condition VARCHAR(100),
  PRIMARY KEY (PokeIDFrom, PokeIDTo),
  FOREIGN KEY (PokeIDFrom) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeIDTo) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Parent(
  MoveName VARCHAR(25) NOT NULL,
  PokeID NUMBER,
  PRIMARY KEY (MoveName, PokeID),
  FOREIGN KEY (MoveName) REFERENCES EggMove(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Uses(
  MoveName VARCHAR(25) NOT NULL,
  PokeID NUMBER,
  PRIMARY KEY (MoveName, PokeID),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Move1(
  Accuracy NUMBER,
  MovePower NUMBER,
  PP NUMBER,
  Type VARCHAR(8),
  Function VARCHAR(15),
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (Function) REFERENCES Move2(Function) 
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE Move2(
  Function VARCHAR(15),
  CanMiss CHAR(1),
  PRIMARY KEY (Function)
);

CREATE TABLE EggMove(
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE LevelMove(
  MoveName VARCHAR(25),
  UnlockLevel NUMBER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TMHMMove(
  MoveName VARCHAR(25),
  MoveNumber NUMBER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TutorMoveTeaches(
  MoveName VARCHAR(25),
  Price VARCHAR(25),
  Address VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Address) REFERENCES LocationFeaturesAccess1(Address) 
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE Generation(
  GenerationNumber NUMBER,
  Console VARCHAR(25),
  PRIMARY KEY (GenerationNumber)
);
