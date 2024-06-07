package es.natalia.ApiBarcos.ConfiguracionSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import es.natalia.ApiBarcos.JWT.JwtAuthenticationFilter;
 
@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

	@Autowired
	private UserDetailsService userDetailsService; // Interfaz para cargar detalles del usuario
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
 
    // Método para crear un bean de encriptador de contraseñas
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // Encriptador de contraseñas
	}
    // Método para crear un bean de administrador de autenticación
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
    {
        return config.getAuthenticationManager();
    }
    // Método para crear un proveedor de autenticación DAO
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userDetailsService);
		auth.setPasswordEncoder(passwordEncoder());
		return auth;
	}
    // Método para configurar la cadena de filtros de seguridad
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 
		http
				// Cross-Site Request Forgery, método de seguridad que utiliza por defecto
				// spring security
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(authRequest -> {
					// Permite acceso a estas url
					authRequest.requestMatchers("/controladorIniciarSesion/**","/controladorRegistrar/**","/api/**").permitAll();
					// Autenticación para cualquier otra solicitud
					authRequest.anyRequest().authenticated();
				})
				.sessionManagement(sessionManager -> sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
				 .logout(logout -> // Configuración para el logout
	                logout
	                    .logoutUrl("/logout") // Endpoint para el logout
	                    .logoutSuccessUrl("/login?logout") // Redirección después del logout
	                    .invalidateHttpSession(true)
	                    .deleteCookies("JSESSIONID")
	            );
 
		return http.build();
	}
	
	
	
}
	 


