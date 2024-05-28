package net.guides.springboot.registraionlogindemo.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.guides.springboot.registraionlogindemo.Modelos.Salida;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioSalida;



@Service
public class ServicioSalidaImpl implements ISalida {

	@Autowired
	private RepositorioSalida repoSalida;
	
	@Override
	public void añardirSalida(Salida nuevoSalida) {
		repoSalida.save(nuevoSalida);		
	}

	@Override
	public List<Salida> mostrarSalidas() {
		return(List<Salida>)repoSalida.findAll();
	}

	@Override
	public void eliminarSalidaPorId(int idSalida) {
		repoSalida.deleteById(idSalida);
	}

	@Override
	public Salida buscarSalidaPorId(int idSalida) {
		return repoSalida.findById(idSalida).orElse(null);
	}

	@Override
	public void modificarSalida(Salida salidaModifica) {
		repoSalida.save(salidaModifica);		

	}
	
	@Override
	public List<Salida> mostrarSalidasPorEmail(String email){
		return repoSalida.findSalidasBySocio(email);
	}

}
