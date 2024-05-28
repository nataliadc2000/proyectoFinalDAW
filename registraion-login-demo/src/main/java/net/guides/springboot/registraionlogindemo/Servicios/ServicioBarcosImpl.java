package net.guides.springboot.registraionlogindemo.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.guides.springboot.registraionlogindemo.Modelos.Barco;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioBarcos;

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
