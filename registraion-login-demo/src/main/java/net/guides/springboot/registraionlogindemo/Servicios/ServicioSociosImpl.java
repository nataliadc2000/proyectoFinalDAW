package net.guides.springboot.registraionlogindemo.Servicios;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import lombok.RequiredArgsConstructor;
import net.guides.springboot.registraionlogindemo.Modelos.Socio;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioSocio;

@Service
@RequiredArgsConstructor
public class ServicioSociosImpl implements ISocios {

	

	@Autowired
	private RepositorioSocio repoSocio;
	
	@Override
	public void añadirSocios(Socio nuevoSocio) {
		nuevoSocio.setRol("basico");
		 repoSocio.save(nuevoSocio);
	}
	public void añadirSociosAdmin(Socio nuevoSocio) {
		 repoSocio.save(nuevoSocio);
	}
	
	@Override
	public void eliminarSocioPorId(int idSocio) {
		repoSocio.deleteById(idSocio);
	}
	
	@Override
	public Socio mostrarSocioPorId(int idSocio) {
		return repoSocio.findById(idSocio).orElse(null);
	}
	
	
	@Override
	public List<Socio> listasSocios() {
		return (List<Socio>) repoSocio.findAll();
	}
	
	@Override
	public void eliminarSocioEmail(String email) {
		   Optional<Socio> socioOptional = repoSocio.findByEmail(email);
		    if (socioOptional.isPresent()) {
		        // Obtener el socio del Optional
		        Socio socioAEliminar = socioOptional.get();
		        // Eliminar el socio encontrado
		        repoSocio.delete(socioAEliminar);
		    } else {
		    	System.out.println("No hay ningun socio con ese email:" + email);
		    }
	}
	@Override
	public Socio mostrarSocioPorEmail(String email) {
	    Optional<Socio> socioOptional = repoSocio.findByEmail(email);
	    return socioOptional.orElse(null);
	}
	
	@Override
    public boolean verificarEmailExistente(@PathVariable String email) {
        Socio socio = repoSocio.findByEmail(email).orElse(null);
        return socio != null;
    }
	

	

}
