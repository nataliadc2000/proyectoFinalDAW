package es.natalia.ApiBarcos.Servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import es.natalia.ApiBarcos.JWT.AuthResponse;
import es.natalia.ApiBarcos.JWT.JwtService;
import es.natalia.ApiBarcos.Modelos.Socio;
import es.natalia.ApiBarcos.Repositorios.RepositorioSocio;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;


@Service
@RequiredArgsConstructor
public class SesionImpl  implements ISesion{

	
	  
		private final RepositorioSocio repoSocio;
	    private final JwtService jwtService;
	    private final PasswordEncoder passwordEncoder;
	    private final AuthenticationManager authenticationManager;
	    
	    @Autowired
	    private ServicioSociosImpl consultaSocio;
	    
	@Override
	public AuthResponse login(String ussername, String password) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(ussername, password));
		Socio socio =repoSocio.findByEmail(ussername).orElseThrow();
		UserDetails user = User.builder().username(socio.getEmail()).password(socio.getPassword()).authorities("Rol_User").build();
        String token=jwtService.getToken(user);
        System.out.println(token);
        return AuthResponse.builder()
            .token(token)
            .build();
	}
	
	@Override
	public AuthResponse register(Socio nuevoSocio) {
		nuevoSocio.setPassword(passwordEncoder.encode(nuevoSocio.getPassword()));
		boolean existe = consultaSocio.verificarEmailExistente(nuevoSocio.getEmail());
		if (existe) {
			return null;
		} else {
			consultaSocio.añadirSocios(nuevoSocio);
			UserDetails user = User.builder().username(nuevoSocio.getEmail()).password(nuevoSocio.getPassword())
					.authorities(nuevoSocio.getRol()).build();

			return AuthResponse.builder().token(jwtService.getToken(user)).build();
		}

	}
	
	@Override
	public AuthResponse registerAdmin(Socio nuevoSocio) {
		nuevoSocio.setPassword(passwordEncoder.encode(nuevoSocio.getPassword()));
		boolean existe = consultaSocio.verificarEmailExistente(nuevoSocio.getEmail());
		if (existe) {
			return null;
		} else {
			consultaSocio.añadirSociosAdmin(nuevoSocio);
			UserDetails user = User.builder().username(nuevoSocio.getEmail()).password(nuevoSocio.getPassword())
					.authorities(nuevoSocio.getRol()).build();

			return AuthResponse.builder().token(jwtService.getToken(user)).build();
		}

	}

}
