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

import es.natalia.ApiBarcos.Modelos.Barco;
import es.natalia.ApiBarcos.Modelos.Socio;
import es.natalia.ApiBarcos.Servicios.ServicioBarcosImpl;
import es.natalia.ApiBarcos.Servicios.ServicioSociosImpl;

@CrossOrigin(origins = {"http://localhost:4200"}) //Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorBarco")
public class ControladorBarco {

	
	@Autowired
	private ServicioBarcosImpl consultasBarco;
	
	@Autowired
	private ServicioSociosImpl consultaSocios;
	
	
	/***
	 * Metodo para añadir un nuevo barco.
	 * @param nuevoBarco
	 */
	@PostMapping("/barcos")
	public void añadirBarco(@RequestBody Barco nuevoBarco) {
		Socio nuevoSocio= consultaSocios.mostrarSocioPorId(nuevoBarco.getSocios().getIdSocio());
		nuevoBarco.setSocios(nuevoSocio);
		consultasBarco.añadirBarco(nuevoBarco);
	}
	/**
	 * Metodo para mostrar el listado de todos los barcos
	 * @param nuevoBarco
	 */
	@GetMapping("/barcos")
	public List<Barco> listarBarcos(){
		return (List<Barco>)consultasBarco.mostrarBarcos();
	}
	/**
	 * Metodo para eliminar un barco por su id.
	 * @param idBarco
	 */
	@DeleteMapping("/barcos/{idBarco}")
	public void eliminarBarco(@PathVariable int idBarco) {
		consultasBarco.eliminarBarco(idBarco);
	}

	/**
	 * Metodo para editar un barco por su id.
	 * @param idBarco
	 * @param barcoActualizado
	 */
	@PutMapping("/barcos/editar/{idBarco}")
	public void editarBarco(@PathVariable int idBarco, @RequestBody Barco barcoActualizado) {
	    // Obtener el barco actual de la base de datos
	    Barco barcoExistente = consultasBarco.buscarBarcoPorId(idBarco);
	    
	    // Verificar si el barco existe
	    if (barcoExistente != null) {
	        // Actualizar los datos del barco existente con los datos del barco actualizado
	        barcoExistente.setNumeroMatricula(barcoActualizado.getNumeroMatricula());
	        barcoExistente.setNombreBarco(barcoActualizado.getNombreBarco());
	        barcoExistente.setNumeroAmarre(barcoActualizado.getNumeroAmarre());
	        barcoExistente.setCuotaMensual(barcoActualizado.getCuotaMensual());
	        barcoExistente.setSocios(barcoActualizado.getSocios());
	        // Guardar los cambios en la base de datos
	        consultasBarco.añadirBarco(barcoExistente);
	    }
	}
	/**
	 * Metodo para mostrar los barcos de un socio por su email.
	 * @param email
	 * @return
	 */
	@GetMapping("/barcos/misBarcos/{email}")
	public List<Barco> listadoDeBarcosPorEmail(@PathVariable String email){
        return consultasBarco.mostrarBarcosPorEmail(email);
	}
	/**
	 * Metodo para mostrar un barco a traves de su email.
	 * @param idBarco
	 * @return
	 */
	@GetMapping("/barcos/{idBarco}")
	public Barco buscarPorId(@PathVariable int idBarco) {
		return consultasBarco.buscarBarcoPorId(idBarco);
	}
	
	
	
	
	
	
}
