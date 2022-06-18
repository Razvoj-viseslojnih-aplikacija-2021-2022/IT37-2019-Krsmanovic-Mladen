
insert into nacionalnost values (-100, 'test', 'test')
insert into liga values (-100, 'test', 'test')
 INSERT INTO tim (id,naziv,osnovan,sediste,liga)
 VALUES (-100,'Crvena ',to_date('05.03.1989.','dd.mm.yyyy.'),'Beograd',-100)	
 
  INSERT INTO igrac (id,ime,prezime,broj_reg,datum_rodjenja,nacionalnost,tim)
  VALUES (-100,'Milan','Jovic','0609496',to_date('05.03.1989.','dd.mm.yyyy.'),-100,-100)
 
-- NACIONALNOST podatke

INSERT INTO nacionalnost (id,naziv,skracenica)
VALUES (nextval('nacionalnost_seq'),'Srbija','SRB'),
        (nextval('nacionalnost_seq'),'Hrvatska','HRV'),
		(nextval('nacionalnost_seq'),'Ruska Federacija','RUS'),
		(nextval('nacionalnost_seq'),'Nemacka','DEU'),
		(nextval('nacionalnost_seq'),'Francuska','FRA'),
		(nextval('nacionalnost_seq'),'Spanija','ESP');


 -- LIGA podatke
 
 INSERT INTO liga (id,naziv,oznaka)
 VALUES (nextval('liga_seq'),'Linglong Superliga Srbije','SuperLiga'),
         (nextval('liga_seq'),'1. Hrvatska Nogometna Liga','1.HNL'),
		 (nextval('liga_seq'),'1. Premijer Liga Rusije','Premier League'),
		 (nextval('liga_seq'),'Bundesliga Nemcke','BUNDESLIGA'),
		 (nextval('liga_seq'),'Liga 1 Francuske','LIGUE 1'),
		 (nextval('liga_seq'),'La Liga Spanije','LaLiga');
		 
		 
	-- TIM podatke
	
 INSERT INTO tim (id,naziv,osnovan,sediste,liga)
 VALUES (nextval('tim_seq'),'FK Crvena Zvezda',to_date('04.03.1945.','dd.mm.yyyy.'),'Beograd',1),
        (nextval('tim_seq'),'GNK Dinamo Zagreb',to_date('26.04.1911.','dd.mm.yyyy.'),'Zagreb',2),
		(nextval('tim_seq'),'FK Spartak Moskva',to_date('18.04.1922.','dd.mm.yyyy.'),'Moskva',3),
		(nextval('tim_seq'),'FK Bajern Minhen',to_date('27.02.1900.','dd.mm.yyyy.'),'Minhen',4),
		(nextval('tim_seq'),'FK Pariz Sen Zermen',to_date('12.08.1970.','dd.mm.yyyy.'),'Pariz',5),
		(nextval('tim_seq'),'FK Real Madrid',to_date('06.03.1902.','dd.mm.yyyy.'),'Madrid',6);
	
	
  -- IGRAC podatke
  
  INSERT INTO igrac (id,ime,prezime,broj_reg,datum_rodjenja,nacionalnost,tim)
  VALUES (nextval('igrac_seq'),'Veljko','Nikolic','985555598',to_date('29.08.1999.','dd.mm.yyyy.'),1,1),
          (nextval('igrac_seq'),'Petar','Bockaj','985555567',to_date('23.07.1996.','dd.mm.yyyy.'),2,2),
		  (nextval('igrac_seq'),'Pavel','Maslov','985555545',to_date('14.04.2000.','dd.mm.yyyy.'),3,3),
		  (nextval('igrac_seq'),'Thomas','Muller','675555598',to_date('13.09.1989.','dd.mm.yyyy.'),4,4),
		  (nextval('igrac_seq'),'Colin','Dagba','675387598',to_date('09.09.1998.','dd.mm.yyyy.'),5,5),
		  (nextval('igrac_seq'),'Jose','Iglesias','675825598',to_date('18.01.1990.','dd.mm.yyyy.'),6,6);
	
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 