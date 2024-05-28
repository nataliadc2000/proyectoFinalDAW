package net.guides.springboot.registraionlogindemo.ConfiguracionSecurity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import net.guides.springboot.registraionlogindemo.Modelos.Socio;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioSocio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private RepositorioSocio socioRepository;
	
	/**
	 * Método que carga un usuario por su nombre de usuario/email (utilizado en la
	 * autenticación)
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		   // Obtenemos el socio de la base de datos por el email
	    Socio socio = socioRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));

	    // Crear una lista de autoridades para el usuario (incluyendo el rol del socio)
	    List<GrantedAuthority> authorities = new ArrayList<>();
	    
	    authorities.add(new SimpleGrantedAuthority("ROLE_" + socio.getRol()));
	    System.out.println("Rol:" + socio.getRol());
	    // Crear el UserDetails con todas las autoridades
	    return org.springframework.security.core.userdetails.User.builder()
	            .username(username)
	            .password(socio.getPassword())
	            .disabled(false)
	            .authorities(authorities)
	            .build();
	    
	}
}
