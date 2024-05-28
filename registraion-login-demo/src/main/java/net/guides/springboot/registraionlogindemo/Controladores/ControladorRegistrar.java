package net.guides.springboot.registraionlogindemo.Controladores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import es.juancadc.ApiBarcos.JWT.AuthResponse;
// import es.juancadc.ApiBarcos.Modelos.Socio;
// import es.juancadc.ApiBarcos.Servicios.SesionImpl;
import net.guides.springboot.registraionlogindemo.JWT.AuthResponse;
import net.guides.springboot.registraionlogindemo.Modelos.Socio;
import net.guides.springboot.registraionlogindemo.Servicios.SesionImpl;

@CrossOrigin(origins = { "http://localhost:4200" }) // Configuración cross para poder conectar con angular.
@RestController
@RequestMapping("/controladorRegistrar")
public class ControladorRegistrar {

	@Autowired
	private SesionImpl consultasSesion;
	
	/**
	 * Metodo para registrar un socio normal rol=basico.
	 * @param nuevoSocio
	 * @return
	 */
	  @PostMapping(value = "/registrar")
	    public ResponseEntity<AuthResponse> register(@RequestBody Socio nuevoSocio)
	    {
		  AuthResponse respuesta = consultasSesion.register(nuevoSocio);
		  
		  if(respuesta==null) {
			  return ResponseEntity.badRequest().build();
		  }else {
			  return ResponseEntity.ok(respuesta);
		  }
	    }
	  /**
	   * Metodo para registrar un socio eligiendo el rol
	   * @param nuevoSocio
	   * @return
	   */
		@PostMapping(value = "/registrarAdmin")
		public ResponseEntity<AuthResponse> registerAdmin(@RequestBody Socio nuevoSocio) {
			AuthResponse respuesta = consultasSesion.registerAdmin(nuevoSocio);

			if (respuesta == null) {
				return ResponseEntity.badRequest().build();
			} else {
				return ResponseEntity.ok(respuesta);
			}
		}
}
