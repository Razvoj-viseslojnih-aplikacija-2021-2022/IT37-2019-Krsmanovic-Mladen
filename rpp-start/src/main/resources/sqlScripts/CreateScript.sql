
DROP TABLE IF EXISTS nacionalnost CASCADE ;
DROP TABLE IF EXISTS liga CASCADE ;
DROP TABLE IF EXISTS tim CASCADE ;
DROP TABLE IF EXISTS igrac CASCADE ;

DROP SEQUENCE IF EXISTS nacionalnost_seq;
DROP SEQUENCE IF EXISTS liga_seq;
DROP SEQUENCE IF EXISTS tim_seq;
DROP SEQUENCE IF EXISTS igrac_seq;
-- Kada brisemo tabele,prvo brisemo one koje imaju strane kljuceve

CREATE TABLE nacionalnost (
id integer not null,
naziv varchar(100),
skracenica varchar(50)	
);

CREATE TABLE liga(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(50)
);

CREATE TABLE tim (

	id integer not null,
	naziv varchar(100),
	osnovan date,
	sediste varchar(100),
	liga integer not null
	
);

CREATE TABLE igrac (
 id integer not null,
	ime varchar (50),
	prezime varchar (50),
	broj_reg varchar(50),
	datum_rodjenja date,
	nacionalnost integer not null,
	tim integer not null
);

ALTER TABLE nacionalnost
ADD CONSTRAINT pk_nacionalnost PRIMARY KEY(id);

ALTER TABLE liga
ADD CONSTRAINT pk_liga PRIMARY KEY(id);

ALTER TABLE tim
ADD CONSTRAINT pk_tim PRIMARY KEY(id);


ALTER TABLE igrac
ADD CONSTRAINT pk_igrac PRIMARY KEY(id);


ALTER TABLE tim
ADD CONSTRAINT fk_tim_liga FOREIGN KEY
(liga) REFERENCES liga (id);

ALTER TABLE igrac
ADD CONSTRAINT fk_igrac_nacionalnost FOREIGN KEY
(nacionalnost) REFERENCES nacionalnost (id);

ALTER TABLE igrac
ADD CONSTRAINT fk_igrac_tim FOREIGN KEY
(tim) REFERENCES tim (id);


CREATE INDEX idx_pk_nacionalnost ON nacionalnost(id);

CREATE INDEX idx_pk_liga ON liga(id);

CREATE INDEX idx_pk_tim ON tim(id);

CREATE INDEX idx_pk_igrac ON igrac(id);


CREATE INDEX idx_fk_tim_liga
ON tim(liga);

CREATE INDEX idx_fk_igrac_nacionalnost
ON igrac(nacionalnost);

CREATE INDEX idx_fk_igrac_tim
ON igrac(tim);


CREATE SEQUENCE IF NOT EXISTS nacionalnost_seq
INCREMENT 1 START 1;

CREATE SEQUENCE IF NOT EXISTS liga_seq
INCREMENT 1 START 1;

CREATE SEQUENCE IF NOT EXISTS tim_seq
INCREMENT 1 START 1;

CREATE SEQUENCE IF NOT EXISTS igrac_seq
INCREMENT 1 START 1;


ALTER TABLE nacionalnost ALTER COLUMN id SET DEFAULT nextval('nacionalnost_seq');
ALTER TABLE liga ALTER COLUMN id SET DEFAULT nextval('liga_seq');
ALTER TABLE tim ALTER COLUMN id SET DEFAULT nextval('tim_seq');
ALTER TABLE igrac ALTER COLUMN id SET DEFAULT nextval('igrac_seq');



