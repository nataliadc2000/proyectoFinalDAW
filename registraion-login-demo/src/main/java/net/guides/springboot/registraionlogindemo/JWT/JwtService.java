package net.guides.springboot.registraionlogindemo.JWT;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import net.guides.springboot.registraionlogindemo.Modelos.Socio;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioSocio;

/**
 * Clase de configuracion del token JWT
 */
@Service
public class JwtService {

	private static final String SECRET_KEY = "586E3272357538782F413F4428472B4B6250655368566B597033733676397924";

	@Autowired
	private RepositorioSocio socioRepository;

	public String getToken(UserDetails user) {
	    String role = getUserRole(user.getUsername());
	    Map<String, Object> claims = new HashMap<>();
	    claims.put("role", role);
	    return getToken(user.getUsername(), claims);
	}

	private String getUserRole(String username) {
		// Obtenemos el socio de la base de datos por el email
		Socio socio = socioRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));
		return socio.getRol();
	}

	private String getToken(String username, Map<String, Object> claims) {
	    return Jwts.builder()
	            .setClaims(claims)
	            .setSubject(username) // Establecer el nombre de usuario como el sujeto del token
	            .setIssuedAt(new Date(System.currentTimeMillis()))
	            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
	            .signWith(getKey(), SignatureAlgorithm.HS256).compact();
	}

	private Key getKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String getUsernameFromToken(String token) {
		return getClaim(token, Claims::getSubject);
	}

	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	private Claims getAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
	}

	public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Date getExpiration(String token) {
		return getClaim(token, Claims::getExpiration);
	}

	private boolean isTokenExpired(String token) {
		return getExpiration(token).before(new Date());
	}

}
