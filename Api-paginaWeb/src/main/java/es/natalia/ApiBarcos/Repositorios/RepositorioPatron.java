package es.natalia.ApiBarcos.Repositorios;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.natalia.ApiBarcos.Modelos.Patron;
/**
 * Clase RepositorioPatron que extiende de JpaRepository donde se encuentran los metodos que interactuan contra la base de datos.
 */
@Repository
public interface RepositorioPatron extends CrudRepository<Patron, Integer> {

}
