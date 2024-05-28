package net.guides.springboot.registraionlogindemo.Repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import net.guides.springboot.registraionlogindemo.Modelos.Salida;
/**
 * Clase RepositorioSalida que extiende de JpaRepository donde se encuentran los metodos que interactuan contra la base de datos.
 */
@Repository
public interface RepositorioSalida extends CrudRepository<Salida, Integer> {

	@Query("select s from Salida s where s.barco.socios.email=?1")
	public List<Salida> findSalidasBySocio(String email);
}
