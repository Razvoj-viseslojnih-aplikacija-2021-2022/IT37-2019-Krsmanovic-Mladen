package rppstart.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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
import rppstart.jpa.Tim;
import rppstart.repositories.TimRepository;

@CrossOrigin
@RestController
@Api(tags = {"Tim CRUD operacije"})
public class TimRestController {
     
	@Autowired
	private TimRepository timRepository;
	
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@GetMapping("tim")
	@ApiOperation(value = "Vraca kolekciju svih timova iz baze podataka")
	public Collection<Tim> getTimovi() {
		return timRepository.findAll();
	}
	
	
	@GetMapping("tim/{id}")
	@ApiOperation(value = "Vraca tim u odnosu na prosledjenu vrednost path varijable id")
	public Tim getTim(@PathVariable("id") Integer id) {
		return timRepository.getOne(id);
	}
	
  // Mozda ova ispod ne treba i mozda nije ispravna,mozda bude pravila probleme u aplikaciji
	
	@GetMapping("timSediste/{sediste}")
	@ApiOperation(value = "Vraca tim u odnosu na prosledjeno sediste")
	public Collection<Tim> getTimBySediste(@PathVariable("sediste") String sediste) {
		return timRepository.findBySediste(sediste);
	}
	
	
	@PostMapping("tim")
	@ApiOperation(value = "Dodaje novi tim u bazu podataka.")
	public  ResponseEntity<Tim> insertPorudzbina(@RequestBody Tim tim) {
		if(!timRepository.existsById(tim.getId())) {
			timRepository.save(tim);
			return new ResponseEntity<Tim> (HttpStatus.OK);
		}
		return new ResponseEntity<Tim> (HttpStatus.CONFLICT);
	}
	
	
	@PutMapping("tim")
	@ApiOperation(value = "Update-uje postojeci tim.")
	public  ResponseEntity<Tim> updateTim(@RequestBody Tim tim) {
		if(timRepository.existsById(tim.getId())) {
			timRepository.save(tim);
			return new ResponseEntity<Tim> (HttpStatus.OK);
		}
		return new ResponseEntity<Tim> (HttpStatus.NO_CONTENT);
	}
	
//Treba da se prepravi skroz
	
	@DeleteMapping("tim/{id}")
	@ApiOperation(value = "Brise tim u odnosu na vrednost prosledjene path varijable id.")
	public ResponseEntity<Tim> deleteTim(@PathVariable("id") Integer id) {
		if(timRepository.existsById(id)) {
			timRepository.deleteById(id);
			if(id == -100)
			jdbcTemplate.execute("insert into tim (id, naziv, osnovan,sediste, liga)"
					+ "values (-100,'Crvena ', to_date('05.03.1989.', 'dd.mm.yyyy.'),"
					+ " 'Beograd',-100)");
			return new ResponseEntity<Tim> (HttpStatus.OK);
		}
		return new ResponseEntity<Tim> (HttpStatus.NO_CONTENT);
	}
	
	
	
  
	
	
	
}
