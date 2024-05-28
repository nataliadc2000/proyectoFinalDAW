
package es.natalia.ApiBarcos.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.natalia.ApiBarcos.JWT.AuthResponse;
import es.natalia.ApiBarcos.Modelos.Socio;
import es.natalia.ApiBarcos.Servicios.ServicioSociosImpl;

@CrossOrigin(origins = { "http://localhost:4200" }) // Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorSocio")
public class ControladorSocio {

	@Autowired
	private ServicioSociosImpl socios;
	

	/**
	 * Metodo para mostrar los socios.
	 * @return
	 */
	@GetMapping("/socios")
	public List<Socio> listarSocios() {
		return socios.listasSocios();
	}
	/**
	 * Meotodo para eliminar un socio por su id.
	 * @param idSocio
	 * @return
	 */
	@DeleteMapping("/socios/{idSocio}")
	public ResponseEntity<AuthResponse> eliminarSocioId(@PathVariable int idSocio) {
		try {
			System.out.println("Entrando metodo eliminar cuenta: " + idSocio);
			socios.eliminarSocioPorId(idSocio);
			return ResponseEntity.ok(new AuthResponse());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse());
		}
	}
	/**
	 * Metodo para buscar un socio por su id.
	 * @param idSocio
	 * @return
	 */
	@GetMapping("/socios/{idSocio}")
	public Socio buscarSocioPorId(@PathVariable int idSocio) {
		return socios.mostrarSocioPorId(idSocio);
	}

	// Crud Propio

	
	@PostMapping("/socios")
	public void añadirSocio(@RequestBody Socio nuevoSocio) {
		socios.añadirSocios(nuevoSocio);
	}

	
	@DeleteMapping("/socios/email/{email}")
	public ResponseEntity<AuthResponse> eliminarSocioPorEmail(@PathVariable String email) {
		try {
			System.out.println("Entrando metodo eliminar cuenta: " + email);
			socios.eliminarSocioEmail(email);
			return ResponseEntity.ok(new AuthResponse());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse());
		}
	}
	/**
	 * Metodo para editar un socio por su id.
	 * @param idSocio
	 * @param socioActualizado
	 * @return
	 */
	@PutMapping("/socios/editar/{idSocio}")
	public ResponseEntity<AuthResponse> editarSocio(@PathVariable int idSocio, @RequestBody Socio socioActualizado) {
	    try {
	    	System.out.println("Entrando en editar");
	        socioActualizado.setIdSocio(idSocio); // Asegúrate de establecer el ID del socio actualizado
	        socios.añadirSociosAdmin(socioActualizado);
	        return ResponseEntity.ok(new AuthResponse());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AuthResponse());
	    }
	}
	/**
	 * Metodo para mostrar un socio por el id.
	 * @param email
	 * @return
	 */
	@GetMapping("/socios/perfil/{email}")
	public Socio mostrarPerfilSocio(@PathVariable String email) {
		return socios.mostrarSocioPorEmail(email);
	}
	/**
	 * Metodo para verificar si existe un correo o no.
	 * @param email
	 * @return
	 */
	@GetMapping("/socios/verificar/{email}")
	public boolean verificarEmailExistente(@PathVariable String email) {
		System.out.println("entrando verificar email");
	    return socios.verificarEmailExistente(email);

	}
	
}
