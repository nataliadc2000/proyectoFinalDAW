package es.natalia.ApiBarcos.Repositorios;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.natalia.ApiBarcos.Modelos.Socio;
/**
 * Clase RepositorioSocio que extiende de JpaRepository donde se encuentran los metodos que interactuan contra la base de datos.
 */
@Repository
public interface RepositorioSocio extends CrudRepository<Socio, Integer> {
	Socio findByEstanco(String numeroEstanco);
	Optional<Socio> findByEmail(String email);
}
