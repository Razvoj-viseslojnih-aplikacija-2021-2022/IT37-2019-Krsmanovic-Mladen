package rppstart.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rppstart.jpa.Liga;
import rppstart.repositories.LigaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Liga CRUD operacije"})
public class LigaRestController {
      
	@Autowired
	private LigaRepository ligaRepository;
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("liga")
	@ApiOperation(value = "Vraca kolekciju svih liga iz baze podataka")
	public Collection<Liga> getLige()
	{
		return ligaRepository.findAll();
	}
	
	@GetMapping("liga/{id}")
	@ApiOperation(value = "Vraca ligu u odnosu na prosledjenu vrednost path varijable id")
	public Liga getLiga(@PathVariable("id") Integer id)
	{
		return ligaRepository.getOne(id);
	}
	
	@GetMapping("ligaNaziv/{naziv}")
	@ApiOperation(value = "Vraca ligu u odnosu na posledjeni naziv")
	public Collection<Liga> getLigeByNaziv(@PathVariable("naziv") String naziv)
	{
		return ligaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("liga")
	@ApiOperation(value = "Dodaje novu ligu u bazu podataka.")
	public ResponseEntity<Liga> insertLiga(@RequestBody Liga liga) {
		if (!ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("liga")
	@ApiOperation(value = "Update-uje postojecu ligu.")
	public ResponseEntity<Liga> updateLiga(@RequestBody Liga liga) {
		if (ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.CONFLICT);
	}
	
	
	@DeleteMapping("liga/{id}")
	@ApiOperation(value = "Brise ligu u odnosu na vrednost prosledjene path varijable id.")
	public ResponseEntity<Liga> deleteLiga(@PathVariable("id") Integer id) {
		if (ligaRepository.existsById(id)) {
			ligaRepository.deleteById(id);
			
			if (id == -100) 
			{
				jdbcTemplate.execute("insert into liga values (-100, 'test', 'test')");
			}
			
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.NO_CONTENT);
	}
	
}
