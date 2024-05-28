package es.natalia.ApiBarcos.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.natalia.ApiBarcos.Modelos.Barco;
import es.natalia.ApiBarcos.Repositorios.RepositorioBarcos;

@Service
public class ServicioBarcosImpl implements IBarco{

	
	
	@Autowired
	private RepositorioBarcos repoBarco;

	
	@Override
	public void añadirBarco(Barco nuevoBarco) {
		repoBarco.save(nuevoBarco);
	}

	
	@Override
	public void modificarBarco(Barco barcoActualizado) {
		repoBarco.save(barcoActualizado);		
	}
	
	@Override
	public void eliminarBarco(int idBarco) {
		repoBarco.deleteById(idBarco);
	}

	
	@Override
	public List<Barco> mostrarBarcos() {
		return (List<Barco>)repoBarco.findAll();
	}
	
	public List<Barco> mostrarBarcosPorEmail(String email){
		        return repoBarco.findBySocioEmail(email);
		    
	}

	
	@Override
	public Barco buscarBarcoPorId(int idBarco) {
		return repoBarco.findById(idBarco).orElse(null);
	}
	
	
	
}
