package rppstart.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.jpa.Tim;

public interface TimRepository extends JpaRepository<Tim, Integer> {
   // Treba  kreirati neku metodu,pogledati projekat sa vjezbi
	
	Collection<Tim> findBySediste(String sediste);
}
