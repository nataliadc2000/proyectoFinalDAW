package net.guides.springboot.registraionlogindemo.Controladores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
// import es.juancadc.ApiBarcos.JWT.AuthResponse;
// import es.juancadc.ApiBarcos.Servicios.SesionImpl;
import net.guides.springboot.registraionlogindemo.JWT.AuthResponse;
import net.guides.springboot.registraionlogindemo.Servicios.SesionImpl;

@CrossOrigin(origins = {"http://localhost:4200"}) //Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorIniciarSesion")
public class ControladorIniciarSesion {

	@Autowired
	private SesionImpl consultaIniciarSesion;
	
	/**
	 * Metodo para iniciar sesion.
	 * @param email
	 * @param password
	 * @return
	 */
	@PostMapping(value = "/iniciarSesion")
	public ResponseEntity<?> login(@RequestParam("email") String email, @RequestParam("password") String password) {
	    try {
	        AuthResponse response = consultaIniciarSesion.login(email, password);
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ha ocurrido un error inesperado");
	    }
	}
}
