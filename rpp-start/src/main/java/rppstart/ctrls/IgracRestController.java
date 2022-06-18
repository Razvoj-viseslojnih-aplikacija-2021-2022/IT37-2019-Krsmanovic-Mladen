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
import rppstart.jpa.Igrac;
import rppstart.jpa.Tim;
import rppstart.repositories.IgracRepository;
import rppstart.repositories.TimRepository;

@CrossOrigin
@RestController
@Api(tags = {"Igrac CRUD operacije"})
public class IgracRestController {

	@Autowired
	private IgracRepository igracRepository;
	
	
	@Autowired
	private TimRepository timRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	
	@GetMapping("igrac")
	@ApiOperation(value = "Vraca kolekciju svih igraca iz baze podataka")
	public Collection<Igrac> getIgraci() {
		return igracRepository.findAll();
	}
	
	
	@GetMapping("igrac/{id}")
	@ApiOperation(value = "Vraca igraca u odnosu na prosledjenu vrednost path varijable id")
	public Igrac getIgrac(@PathVariable("id") Integer id) {
		return igracRepository.getOne(id);
	}
	
	
	@GetMapping("igracZaTimID/{id}")
	@ApiOperation(value = "Vraca igraca u odnosu na prosledjenu vrednost path varijable tim id")
	public Collection<Igrac> getIgraciByTimID(@PathVariable("id") Integer id) {
		Tim t = timRepository.getOne(id);
		return igracRepository.findByTim(t);
	}
	
	
	// Mozda ova metoda dole ne treba i mozda nije tacna i mozda bude pravila probleme u aplikaciji
	
	@GetMapping("igracBrojReg/{broj_reg}")
	@ApiOperation(value = "Vraca igraca u odnosu na prosledjeni registarski broj")
	public Collection<Igrac> getIgracByBroj_Reg(@PathVariable("broj_reg") String broj_reg) {
		return igracRepository.findByBrojReg(broj_reg);
	}
	
	
	@PostMapping("igrac")
	@ApiOperation(value = "Dodaje novog igraca u bazu podataka.")
	public ResponseEntity<Igrac> insertIgrac(@RequestBody Igrac igrac) {
		if(!igracRepository.existsById(igrac.getId())) {
			igracRepository.save(igrac);
			return new ResponseEntity<Igrac> (HttpStatus.OK);
		}
		return new ResponseEntity<Igrac> (HttpStatus.CONFLICT);
	}
	
	
	@PutMapping("igrac")
	@ApiOperation(value = "Update-uje postojeceg igraca.")
	public ResponseEntity<Igrac> updateIgrac(@RequestBody Igrac igrac) {
		if(igracRepository.existsById(igrac.getId())) {
			igracRepository.save(igrac);
			return new ResponseEntity<Igrac> (HttpStatus.OK);
		}
		return new ResponseEntity<Igrac> (HttpStatus.NO_CONTENT);
	}
	
	
	
	@DeleteMapping("igrac/{id}")
	@ApiOperation(value = "Brise igraca u odnosu na vrednost posledjene path varijable id.")
	public ResponseEntity<Igrac> deleteIgrac(@PathVariable("id") Integer id) {
		if(igracRepository.existsById(id)) {
			igracRepository.deleteById(id);
			if (id == -100) 
				jdbcTemplate.execute("insert into igrac (id, ime, prezime,"
						+ " broj_reg, datum_rodjenja, nacionalnost, tim) "
						+ "values (-100, 'Milan', 'Jovic', '0609496',to_date('05.03.1989.', 'dd.mm.yyyy.'), -100, -100)");
			return new ResponseEntity<Igrac> (HttpStatus.OK);
		}
		return new ResponseEntity<Igrac> (HttpStatus.NO_CONTENT);
	}
	
	
	
}
