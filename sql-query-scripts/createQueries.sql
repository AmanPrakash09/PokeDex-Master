CREATE TABLE AppUser1(
  Email VARCHAR2(254),
  Name VARCHAR2(50),
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
  Email VARCHAR2(254),
  PRIMARY KEY (FileID, Email),
  FOREIGN KEY (Email) REFERENCES AppUser1(Email) ON DELETE CASCADE
);

CREATE TABLE BadgeLoads1(
  BadgeID NUMBER,
  BadgeName VARCHAR2(25),
  FileID NUMBER,
  Email VARCHAR2(254),
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
  BadgeName VARCHAR2(25),
  PRIMARY KEY (BadgeName)
);

CREATE TABLE LocationFeaturesAccess1(
  Address VARCHAR2(25),
  BadgeID NUMBER NOT NULL,
  Title VARCHAR2(50) NOT NULL,
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
  Title VARCHAR2(50),
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
  Address VARCHAR2(25),
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
  PokemonName VARCHAR2(25),
  PokemonLevel VARCHAR2(25),
  Ability VARCHAR2(15),
  Stats NUMBER,
  Type VARCHAR2(8),
  FileID NUMBER,
  Email VARCHAR2(254),
  PRIMARY KEY (PokeID),
  FOREIGN KEY (PokemonName) REFERENCES PokemonStores2(PokemonName) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (FileID, Email) REFERENCES SaveFileManages(FileID, Email) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PokemonStores2(
  PokemonName VARCHAR2(25),
  Type VARCHAR2(8),
  EggGroup VARCHAR2(15),
  PRIMARY KEY (PokemonName)
);

CREATE TABLE Evolves(
  PokeIDFrom NUMBER,
  PokeIDTo NUMBER,
  Condition VARCHAR2(100),
  PRIMARY KEY (PokeIDFrom, PokeIDTo),
  FOREIGN KEY (PokeIDFrom) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeIDTo) REFERENCES PokemonStores1(PokeID) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Parent(
  MoveName VARCHAR2(25) NOT NULL,
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
  MoveName VARCHAR2(25) NOT NULL,
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
  Type VARCHAR2(8),
  Function VARCHAR2(15),
  MoveName VARCHAR2(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (Function) REFERENCES Move2(Function) 
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE Move2(
  Function VARCHAR2(15),
  CanMiss CHAR(1),
  PRIMARY KEY (Function)
);

CREATE TABLE EggMove(
  MoveName VARCHAR2(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE LevelMove(
  MoveName VARCHAR2(25),
  UnlockLevel NUMBER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TMHMMove(
  MoveName VARCHAR2(25),
  MoveNumber NUMBER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1(MoveName) 
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TutorMoveTeaches(
  MoveName VARCHAR2(25),
  Price VARCHAR2(25),
  Address VARCHAR2(25),
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
  Console VARCHAR2(25),
  PRIMARY KEY (GenerationNumber)
);
