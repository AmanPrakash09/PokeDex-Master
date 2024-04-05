/* 
.
User Data CREATE TABLE statements
.
*/

CREATE TABLE AppUser2(
  MembershipLevel DATE,
  Loyalty INTEGER,
  PRIMARY KEY (MembershipLevel)
);

CREATE TABLE AppUser1(
  Email VARCHAR(254),
  Username VARCHAR(50),
  MembershipLevel INTEGER,
  PRIMARY KEY (Email),
  FOREIGN KEY (MembershipLevel) REFERENCES AppUser2 (MembershipLevel) ON DELETE CASCADE
);

CREATE TABLE SaveFileManages(
  FileID INTEGER,
  CreationDate DATE,
  Email VARCHAR(254),
  PRIMARY KEY (FileID, Email),
  FOREIGN KEY (Email) REFERENCES AppUser1 (Email) ON DELETE CASCADE
);

/*
.
Moves CREATE TABLE statements
. 
*/

CREATE TABLE Move2(
  Func VARCHAR(15),
  CanMiss BOOLEAN,
  PRIMARY KEY (Func)
);

CREATE TABLE Move1(
  Accuracy INTEGER,
  Power INTEGER,
  MoveType VARCHAR(8),
  Func VARCHAR(15),
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (Func) REFERENCES Move2 (Func)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE LevelMove(
  MoveName VARCHAR(25),
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1 (MoveName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TMHMMove(
  MoveName VARCHAR(25),
  MoveNumber INTEGER,
  PRIMARY KEY (MoveName),
  FOREIGN KEY (MoveName) REFERENCES Move1 (MoveName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* 
.
Pokemon CREATE TABLE statements
.
*/

CREATE TABLE PokemonStores2(
  PokemonName VARCHAR(25),
  PokeType VARCHAR(25),
  EggGroup VARCHAR(15),
  PRIMARY KEY (PokemonName)
);

CREATE TABLE PokemonStores1(
  PokeID VARCHAR(100),
  PokemonName VARCHAR(25),
  PokemonLevel VARCHAR(25),
  Ability VARCHAR(50),
  Stats INTEGER,
  FileID INTEGER,
  Email VARCHAR(254),
  PRIMARY KEY (PokeID),
  FOREIGN KEY (PokemonName) REFERENCES PokemonStores2 (PokemonName)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (FileID, Email) REFERENCES SaveFileManages (FileID, Email)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Evolves(
  PokeIDFrom VARCHAR(100),
  PokeIDTo VARCHAR(100),
  Cond VARCHAR(100),
  PRIMARY KEY (PokeIDFrom, PokeIDTo),
  FOREIGN KEY (PokeIDFrom) REFERENCES PokemonStores1 (PokeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (PokeIDTo) REFERENCES PokemonStores1 (PokeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* 
.
PokemonMoveRelationships CREATE TABLE statements
.
*/

CREATE TABLE Learns(
	MoveName VARCHAR(25),
    PokeID VARCHAR(100),
    Lv INTEGER,
    PRIMARY KEY (MoveName, PokeID),
    FOREIGN KEY (PokeID) REFERENCES PokemonStores1 (PokeID)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (MoveName) REFERENCES LevelMove (MoveName)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Accesses(
	MoveName VARCHAR(25),
    PokeID VARCHAR(100),
    PRIMARY KEY (MoveName, PokeID),
    FOREIGN KEY (PokeID) REFERENCES PokemonStores1 (PokeID)
		ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (MoveName) REFERENCES TMHMMove (MoveName)
		ON DELETE CASCADE
        ON UPDATE CASCADE
);

/* 
.
Badge CREATE TABLE statements
.
*/

CREATE TABLE BadgeLoads2(
  ObedienceLevel INTEGER,
  BadgeName VARCHAR(25),
  PRIMARY KEY (BadgeName)
);

CREATE TABLE BadgeLoads1(
  BadgeID VARCHAR(100),
  BadgeName VARCHAR(25),
  FileID INTEGER,
  Email VARCHAR(254),
  PRIMARY KEY (BadgeID),
  FOREIGN KEY (FileID, Email) REFERENCES SaveFileManages (FileID, Email)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (BadgeName) REFERENCES BadgeLoads2 (BadgeName)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* 
.
PokemonGame CREATE TABLE statements
.
*/

CREATE TABLE Generation(
  GenerationNumber INTEGER,
  Console VARCHAR(25),
  PRIMARY KEY (GenerationNumber)
);

CREATE TABLE PokemonGameCategorizes2(
  ReleaseDate DATE,
  SalePrice REAL,
  PRIMARY KEY (ReleaseDate)
);

CREATE TABLE PokemonGameCategorizes1(
  Title VARCHAR(50),
  ReleaseDate DATE,
  GenerationNumber INTEGER NOT NULL,
  PRIMARY KEY (Title),
  FOREIGN KEY (ReleaseDate) REFERENCES PokemonGameCategorizes2 (ReleaseDate)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (GenerationNumber) REFERENCES Generation (GenerationNumber)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

/* 
.
Location CREATE TABLE statements
.
*/

CREATE TABLE LocationFeaturesAccess2(
  IsRoute BOOLEAN,
  HasTrainers BOOLEAN,
  UNIQUE (HasTrainers),
  PRIMARY KEY (IsRoute)
);

CREATE TABLE LocationFeaturesAccess3(
  RouteNumber INTEGER,
  IsRoute BOOLEAN,
  PRIMARY KEY (RouteNumber),
  FOREIGN KEY (IsRoute) REFERENCES LocationFeaturesAccess2 (IsRoute)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE LocationFeaturesAccess1(
  Address VARCHAR(25),
  BadgeID VARCHAR(100) NOT NULL,
  Title VARCHAR(50) NOT NULL,
  RouteNumber INTEGER,
  PRIMARY KEY (Address),
  FOREIGN KEY (BadgeID) REFERENCES BadgeLoads1 (BadgeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (RouteNumber) REFERENCES LocationFeaturesAccess3 (RouteNumber)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (Title) REFERENCES PokemonGameCategorizes1 (Title)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PokemonContains(
  PokeID VARCHAR(100) NOT NULL,
  Address VARCHAR(25),
  PRIMARY KEY (PokeID, Address),
  FOREIGN KEY (PokeID) REFERENCES PokemonStores1 (PokeID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Address) REFERENCES LocationFeaturesAccess1 (Address)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
