package rppstart.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rppstart.jpa.Liga;

public interface LigaRepository extends JpaRepository<Liga, Integer> {

	
	Collection<Liga> findByNazivContainingIgnoreCase(String naziv);
}
