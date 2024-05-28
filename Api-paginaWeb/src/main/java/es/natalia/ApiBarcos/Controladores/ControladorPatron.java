package es.natalia.ApiBarcos.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.natalia.ApiBarcos.Modelos.Patron;
import es.natalia.ApiBarcos.Servicios.ServicioPatronImpl;

@CrossOrigin(origins = { "http://localhost:4200" }) // Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorPatron")
public class ControladorPatron {

	@Autowired
	ServicioPatronImpl consultasPatron;

	/**
	 * Metodo para añadir un nuevo patron
	 * @param nuevoPatron
	 */
	@PostMapping("/patron")
	public void añadirPatron(@RequestBody Patron nuevoPatron) {
		consultasPatron.añadirPatron(nuevoPatron);
	}
	/**
	 * Metodo para mostrar el listado de patrones.
	 * @return
	 */
	@GetMapping("/patron")
	public List<Patron> listarPatron() {
		return consultasPatron.mostrarPatrones();
	}
	/**
	 * Metodo para eliminar un patron por su id.
	 * @param idPatron
	 */
	@DeleteMapping("/patron/{idPatron}")
	public void eliminarPatronId(@PathVariable int idPatron) {
		consultasPatron.eliminarPatron(idPatron);
	}
	
	@PutMapping("/patron/editarPatron/{idPatron}")
	public void editarPatron(@PathVariable int idPatron, @RequestBody Patron patronActualizado) {
	    
		
	    Patron patronExistente = consultasPatron.mostrarPatronPorId(idPatron);
	    // Verificar si el patrón existe
	    if (patronExistente != null) {
	        // Actualizar los campos del patrón existente con los valores del patrón actualizado
	        patronExistente.setNombrePatron(patronActualizado.getNombrePatron());
	        patronExistente.setDniPatron(patronActualizado.getDniPatron());
	        // Guardar el patrón actualizado en la base de datos
	        consultasPatron.añadirPatron(patronExistente);
	    } else {
	        
	    }
	}
	/**
	 * Metodo que devuelve un patron por el id.
	 * @param idPatron
	 * @return
	 */
	@GetMapping("/patron/{idPatron}")
	public Patron buscarPatronPorId(@PathVariable int idPatron) {
		return consultasPatron.mostrarPatronPorId(idPatron);
	}

	

	
}
