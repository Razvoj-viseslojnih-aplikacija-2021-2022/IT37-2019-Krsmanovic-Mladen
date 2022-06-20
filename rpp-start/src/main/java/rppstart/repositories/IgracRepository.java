package rppstart.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.jpa.Igrac;
import rppstart.jpa.Tim;

public interface IgracRepository extends JpaRepository<Igrac, Integer> {
    
	Collection<Igrac> findByTim(Tim t);
	
	// Mozda i ovdje jos nesto treba dodati,pogledati projekat sa vjezbi
	
	Collection<Igrac> findByBrojReg(String broj_reg);
	
}
