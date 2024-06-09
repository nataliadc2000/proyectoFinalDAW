
package es.natalia.ApiBarcos.Repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.natalia.ApiBarcos.Modelos.Image;

@Repository
public interface RepositorioImage extends JpaRepository<Image,Long> {

    
}