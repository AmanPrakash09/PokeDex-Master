INSERT ALL
  INTO AppUser1(Email, Name, DateJoined) VALUES ('111@gmail.com', 'Ash', TO_DATE('01-05-2022', 'DD-MM-YYYY'))
  INTO AppUser1(Email, Name, DateJoined) VALUES ('222@gmail.com', 'Ash', TO_DATE('01-05-2022', 'DD-MM-YYYY'))
  INTO AppUser1(Email, Name, DateJoined) VALUES ('333@gmail.com', 'Wash', TO_DATE('12-05-1999', 'DD-MM-YYYY'))
  INTO AppUser1(Email, Name, DateJoined) VALUES ('444@gmail.com', 'epicman', TO_DATE('20-06-2000', 'DD-MM-YYYY'))
  INTO AppUser1(Email, Name, DateJoined) VALUES ('555@gmail.com', '555', TO_DATE('01-10-2023', 'DD-MM-YYYY'))
SELECT * FROM dual;

INSERT ALL
  INTO AppUser2 (DateJoined, Loyalty) VALUES (TO_DATE('01-05-2022', 'DD-MM-YYYY'), 2)
  INTO AppUser2 (DateJoined, Loyalty) VALUES (TO_DATE('01-06-2022', 'DD-MM-YYYY'), 2)
  INTO AppUser2 (DateJoined, Loyalty) VALUES (TO_DATE('12-05-1999', 'DD-MM-YYYY'), 25)
  INTO AppUser2 (DateJoined, Loyalty) VALUES (TO_DATE('20-06-2000', 'DD-MM-YYYY'), 24)
  INTO AppUser2 (DateJoined, Loyalty) VALUES (TO_DATE('01-10-2023', 'DD-MM-YYYY'), 1)
SELECT * FROM dual;

INSERT ALL
  INTO SaveFileManages (FileID, CreationDate, Email) VALUES (1, TO_DATE('01-05-2022', 'DD-MM-YYYY'), '111@gmail.com')
  INTO SaveFileManages (FileID, CreationDate, Email) VALUES (2, TO_DATE('01-05-2022', 'DD-MM-YYYY'), '111@gmail.com')
  INTO SaveFileManages (FileID, CreationDate, Email) VALUES (1, TO_DATE('12-05-1999', 'DD-MM-YYYY'), '222@gmail.com')
  INTO SaveFileManages (FileID, CreationDate, Email) VALUES (1, TO_DATE('20-06-2000', 'DD-MM-YYYY'), '444@gmail.com')
  INTO SaveFileManages (FileID, CreationDate, Email) VALUES (1, TO_DATE('01-10-2023', 'DD-MM-YYYY'), '555@gmail.com')
SELECT * FROM dual;

INSERT ALL
  INTO BadgeLoads1 (BadgeID, BadgeName, FileID, Email) VALUES (1, 'Cascade', 1, '111@gmail.com')
  INTO BadgeLoads1 (BadgeID, BadgeName, FileID, Email) VALUES (2, 'Rock', 3, 'abc@gmail.com')
  INTO BadgeLoads1 (BadgeID, BadgeName, FileID, Email) VALUES (3, 'Rainbow', 2, '123@gmail.com')
  INTO BadgeLoads1 (BadgeID, BadgeName, FileID, Email) VALUES (4, 'Cascade', 1, '111@gmail.com')
  INTO BadgeLoads1 (BadgeID, BadgeName, FileID, Email) VALUES (5, 'Cascade', 6, '555@gmail.com')
SELECT * FROM dual;

INSERT ALL
  INTO BadgeLoads2 (BadgeName, ObedienceLevel) VALUES ('Cascade', 15)
  INTO BadgeLoads2 (BadgeName, ObedienceLevel) VALUES ('Rock', 25)
  INTO BadgeLoads2 (BadgeName, ObedienceLevel) VALUES ('Rainbow', 100)
  INTO BadgeLoads2 (BadgeName, ObedienceLevel) VALUES ('Spectre', 60)
  INTO BadgeLoads2 (BadgeName, ObedienceLevel) VALUES ('Blaze', 25)
SELECT * FROM dual;

INSERT ALL
  INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber) VALUES ('6200 University Blvd', 1, 'Scarlet and Violet', 1)
  INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber) VALUES ('1860 E Mall #301', 2, 'Brilliant Diamond', 2)
  INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber) VALUES ('6133 University Blvd', 3, 'Legends Arceus', 3)
  INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber) VALUES ('6138 Student Union Blvd', 4, 'Unite', 4)
  INTO LocationFeaturesAccess1(Address, BadgeID, Title, RouteNumber) VALUES ('2053 Main Mall', 5, 'Shining Pearl', -1)
SELECT * FROM dual;

INSERT ALL
  INTO LocationFeaturesAccess2 (IsRoute, HasTrainer) VALUES ('T', 'T')
  INTO LocationFeaturesAccess2 (IsRoute, HasTrainer) VALUES ('F', 'F')
SELECT * FROM dual;

INSERT ALL
  INTO LocationFeaturesAccess3(RouteNumber, IsRoute) VALUES (1, 'T')
  INTO LocationFeaturesAccess3(RouteNumber, IsRoute) VALUES (2, 'T')
  INTO LocationFeaturesAccess3(RouteNumber, IsRoute) VALUES (3, 'T')
  INTO LocationFeaturesAccess3(RouteNumber, IsRoute) VALUES (4, 'T')
  INTO LocationFeaturesAccess3(RouteNumber, IsRoute) VALUES (-1, 'F')
SELECT * FROM dual;

INSERT ALL
  INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber) VALUES ('Scarlet and Violet', TO_DATE('01-05-2022', 'DD-MM-YYYY'), 1)
  INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber) VALUES ('Brilliant Diamond', TO_DATE('01-06-2022', 'DD-MM-YYYY'), 2)
  INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber) VALUES ('Legends Arceus', TO_DATE('12-05-1999', 'DD-MM-YYYY'), 3)
  INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber) VALUES ('Unite', TO_DATE('20-06-2000', 'DD-MM-YYYY'), 4)
  INTO PokemonGameCategorizes1(Title, ReleaseDate, GenerationNumber) VALUES ('Shining Pearl', TO_DATE('01-10-2023', 'DD-MM-YYYY'), 5)
SELECT * FROM dual;

INSERT ALL
  INTO PokemonGameCategorizes2(ReleaseDate, SalePrice) VALUES (TO_DATE('01-05-2022', 'DD-MM-YYYY'), 50.50)
  INTO PokemonGameCategorizes2(ReleaseDate, SalePrice) VALUES (TO_DATE('01-06-2022', 'DD-MM-YYYY'), 50.55)
  INTO PokemonGameCategorizes2(ReleaseDate, SalePrice) VALUES (TO_DATE('12-05-1999', 'DD-MM-YYYY'), 31.31)
  INTO PokemonGameCategorizes2(ReleaseDate, SalePrice) VALUES (TO_DATE('20-06-2000', 'DD-MM-YYYY'), 24.00)
  INTO PokemonGameCategorizes2(ReleaseDate, SalePrice) VALUES (TO_DATE('01-10-2023', 'DD-MM-YYYY'), 57.99)
SELECT * FROM dual;

INSERT ALL
  INTO Contains(Address, PokeID) VALUES ('6200 University Blvd', 1)
  INTO Contains(Address, PokeID) VALUES ('1860 E Mall #301', 2)
  INTO Contains(Address, PokeID) VALUES ('6200 University Blvd', 3)
  INTO Contains(Address, PokeID) VALUES ('6138 Student Union Blvd', 4)
  INTO Contains(Address, PokeID) VALUES ('2053 Main Mall', 5)
SELECT * FROM dual;

INSERT ALL
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (1, 'Charizard', 7, 'fly', 313131313131, 1, '555@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (2, 'Pikachu', 77, 'rizz', 310031293105, 2, '111@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (3, 'Squirtle', 777, 'dance', 312131093100, 1, '222@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (4, 'Wartortle', 16, 'float', 310031003100, 1, '222@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (5, 'Raichu', 771, 'throw', 310031003111, 2, '111@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (6, 'Charmander', 420, 'punch', 000000000000, 1, '555@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (7, 'Charmeleon', 8, 'think', 001122300011, 1, '555@gmail.com')
  INTO PokemonStores1(PokeID, PokemonName, PokemonLevel, Ability, Stats, FileID, Email) VALUES (8, 'Blastoise', 36, 'spray', 100000000000, 1, '222@gmail.com')
SELECT * FROM dual;

INSERT ALL
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Charizard', 'Fire', 'Dragon')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Pikachu', 'Electric', 'Fairy')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Squirtle', 'Water', 'Water1')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Wartortle', 'Water', 'Water1')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Raichu', 'Electric', 'Fairy')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Charmander', 'Fire', 'Dragon')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Charmeleon', 'Fire', 'Dragon')
  INTO PokemonStores2(PokemonName, Type, EggGroup) VALUES ('Blastoise', 'Water', 'Water1')
SELECT * FROM dual;

INSERT ALL
  INTO TutorMoveTeaches(MoveName, Price, Address) VALUES ('Counter', '1 Diamond', '6200 University Blvd')
  INTO TutorMoveTeaches(MoveName, Price, Address) VALUES ('Body Slam', '3 Gold', '1860 E Mall #301')
  INTO TutorMoveTeaches(MoveName, Price, Address) VALUES ('Explosion', '2 Bronze', '6133 University Blvd')
  INTO TutorMoveTeaches(MoveName, Price, Address) VALUES ('Mega Kick', '7 Bronze', '6138 Student Union Blvd')
  INTO TutorMoveTeaches(MoveName, Price, Address) VALUES ('Mimic', '4 Dirt', '2053 Main Mall')
SELECT * FROM dual;

INSERT ALL
  INTO Evolves(PokeIDfrom, PokeIDto, Condition) VALUES (1, 6, 'eats some food')
  INTO Evolves(PokeIDfrom, PokeIDto, Condition) VALUES (2, 5, 'goes to therapy')
  INTO Evolves(PokeIDfrom, PokeIDto, Condition) VALUES (3, 4, 'swims a bit')
  INTO Evolves(PokeIDfrom, PokeIDto, Condition) VALUES (7, 6, 'starts a fire')
  INTO Evolves(PokeIDfrom, PokeIDto, Condition) VALUES (4, 8, 'learns to swim')
SELECT * FROM dual;

INSERT ALL
  INTO Parent(MoveName, PokeID) VALUES ('Counter', 1)
  INTO Parent(MoveName, PokeID) VALUES ('Body Slam', 2)
  INTO Parent(MoveName, PokeID) VALUES ('Explosion', 3)
  INTO Parent(MoveName, PokeID) VALUES ('Mega Kick', 4)
  INTO Parent(MoveName, PokeID) VALUES ('Mimic', 5)
  INTO Parent(MoveName, PokeID) VALUES ('Pound', 6)
  INTO Parent(MoveName, PokeID) VALUES ('Karate Chop', 7)
  INTO Parent(MoveName, PokeID) VALUES ('Scratch', 8)
SELECT * FROM dual;

INSERT ALL
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 1)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 2)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 3)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 4)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 5)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 6)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 7)
  INTO Uses(MoveName, PokeID) VALUES ('Counter', 8)
SELECT * FROM dual;

INSERT ALL
  INTO Move1(Accuracy, MovePower, PP, Type, Function, MoveName) VALUES (100, 100, 15, 'Fire', 'Special', 'Flamethrower')
  INTO Move1(Accuracy, MovePower, PP, Type, Function, MoveName) VALUES (85, 120, 10, 'Rock', 'Physical', 'Stone Edge')
  INTO Move1(Accuracy, MovePower, PP, Type, Function, MoveName) VALUES (100, 0, 15, 'Psychic', 'Status', 'Calm Mind')
  INTO Move1(Accuracy, MovePower, PP, Type, Function, MoveName) VALUES (100, 0, 15, 'Normal', 'Status', 'Swords Dance')
  INTO Move1(Accuracy, MovePower, PP, Type, Function, MoveName) VALUES (100, 40, 25, 'Dragon', 'Special', 'Dragon Rage')
SELECT * FROM dual;

INSERT ALL
  INTO Move2(Function, CanMiss) VALUES ('Status', 'F')
  INTO Move2(Function, CanMiss) VALUES ('Physical', 'T')
  INTO Move2(Function, CanMiss) VALUES ('Special', 'T')
SELECT * FROM dual;

INSERT ALL
  INTO Generation(GenerationNumber, Console) VALUES (1, 'GameBoy')
  INTO Generation(GenerationNumber, Console) VALUES (2, 'GameBoy')
  INTO Generation(GenerationNumber, Console) VALUES (3, 'GameBoy Advance')
  INTO Generation(GenerationNumber, Console) VALUES (4, 'Nintendo DS')
  INTO Generation(GenerationNumber, Console) VALUES (9, 'Nintendo Switch')
SELECT * FROM dual;

INSERT ALL
  INTO TMHMMove(MoveName, MoveNumber) VALUES ('Bullet Seed', 9)
  INTO TMHMMove(MoveName, MoveNumber) VALUES ('Sunny Day', 11)
  INTO TMHMMove(MoveName, MoveNumber) VALUES ('Endure', 58)
  INTO TMHMMove(MoveName, MoveNumber) VALUES ('Rock Slide', 80)
  INTO TMHMMove(MoveName, MoveNumber) VALUES ('Cut', 1)
SELECT * FROM dual;

INSERT ALL
  INTO LevelMove(MoveName, UnlockLevel) VALUES ('Flamethrower', 60)
  INTO LevelMove(MoveName, UnlockLevel) VALUES ('Water Gun', 6)
  INTO LevelMove(MoveName, UnlockLevel) VALUES ('Rock Throw', 60)
  INTO LevelMove(MoveName, UnlockLevel) VALUES ('Grass Knot', 25)
  INTO LevelMove(MoveName, UnlockLevel) VALUES ('Ancient Power', 34)
SELECT * FROM dual;

INSERT ALL
  INTO EggMove(MoveName) VALUES ('Counter')
  INTO EggMove(MoveName) VALUES ('Body Slam')
  INTO EggMove(MoveName) VALUES ('Explosion')
  INTO EggMove(MoveName) VALUES ('Mega Kick')
  INTO EggMove(MoveName) VALUES ('Mimic')
  INTO EggMove(MoveName) VALUES ('Pound')
  INTO EggMove(MoveName) VALUES ('Karate Chop')
  INTO EggMove(MoveName) VALUES ('Scratch')
SELECT * FROM dual;
