package es.natalia.ApiBarcos.Repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.natalia.ApiBarcos.Modelos.Barco;
/**
 * Clase RepositorioBarcos que extiende de JpaRepository donde se encuentran los metodos que interactuan contra la base de datos.
 */
@Repository
public interface RepositorioBarcos extends CrudRepository<Barco, Integer>{
    
	   @Query("SELECT b FROM Barco b WHERE b.socios.email = :email")
	    List<Barco> findBySocioEmail(@Param("email") String email);

}
