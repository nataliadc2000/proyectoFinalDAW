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
import es.natalia.ApiBarcos.Modelos.Patron;
import es.natalia.ApiBarcos.Modelos.Salida;
import es.natalia.ApiBarcos.Servicios.ServicioBarcosImpl;
import es.natalia.ApiBarcos.Servicios.ServicioPatronImpl;
import es.natalia.ApiBarcos.Servicios.ServicioSalidaImpl;

/**
 * Clase controlador de salida, la cual nos permite configurar los distintos endpoint.
 */
@CrossOrigin(origins = {"http://localhost:4200"}) //Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorSalida")
public class ControladorSalidas {

	
	@Autowired
	ServicioSalidaImpl consultasSalidas;
	@Autowired
	ServicioPatronImpl consultasPatron;
	@Autowired
	ServicioBarcosImpl consultasBarcos;
	
	/**
	 * Metodo para añadir una nuevo salida.
	 * @param nuevaSalida
	 */
	@PostMapping("/salidas")
	public void añadirSalida(@RequestBody Salida nuevaSalida) {
		Patron patronSalida = consultasPatron.mostrarPatronPorId(nuevaSalida.getPatron().getIdPatron());
		Barco barcoSalida = consultasBarcos.buscarBarcoPorId(nuevaSalida.getBarco().getIdBarco());
		nuevaSalida.setBarco(barcoSalida);
		nuevaSalida.setPatron(patronSalida);
		consultasSalidas.añardirSalida(nuevaSalida);
	}
	/**
	 * Metodo para mostrar las salidas.
	 * @return
	 */
	@GetMapping("/salidas")
	public List<Salida> listarSalidas(){
		return consultasSalidas.mostrarSalidas();
	}
	/**
	 * Metodo para eliminar un barco por su id.
	 * @param idSalida
	 */
	@DeleteMapping("/salidas/{idSalida}")
	public void eliminarBarco(@PathVariable int idSalida) {
		consultasSalidas.eliminarSalidaPorId(idSalida);
	}
	/**
	 * Metodo para actualizar una salida por su id
	 * @param idSalida
	 * @param salidaActualizada
	 */
	@PutMapping("/salidas/editar/{idSalida}")
	public void actualizarSalida(@PathVariable int idSalida, @RequestBody Salida salidaActualizada) {
	   
		Salida salidaExistente =consultasSalidas.buscarSalidaPorId(idSalida);
	        
		if(salidaActualizada!=null) {
			salidaExistente.setFchHoraSalida(salidaActualizada.getFchHoraSalida());
			salidaExistente.setDestino(salidaActualizada.getDestino());
			salidaExistente.setBarco(salidaActualizada.getBarco());
			salidaExistente.setPatron(salidaActualizada.getPatron());
			consultasSalidas.añardirSalida(salidaExistente);

		}else {
	        // Manejar el caso en que no se encuentre el patrón
	        // Aquí puedes lanzar una excepción, devolver un mensaje de error, etc.
	    }
	       
	}
	/**
	 * Metodo para mostrar las salidas de un socio por su email.
	 * @param email
	 * @return
	 */
	@GetMapping("/salidas/misSalidas/{email}")
	public List<Salida> listadoDeSalidaPorEmail(@PathVariable String email){
        return consultasSalidas.mostrarSalidasPorEmail(email);
	}

	/**
	 * Metodo para mostrar una salida por su id.
	 * @param idSalida
	 * @return
	 */
	@GetMapping("/salidas/{idSalida}")
	public Salida buscarSalidaPorId(@PathVariable int idSalida) {
		return consultasSalidas.buscarSalidaPorId(idSalida);
	}
	
	
	
}
