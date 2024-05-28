package net.guides.springboot.registraionlogindemo.Servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.guides.springboot.registraionlogindemo.Modelos.Patron;
import net.guides.springboot.registraionlogindemo.Repositorios.RepositorioPatron;


@Service
public class ServicioPatronImpl implements IPatron {

	@Autowired
	private RepositorioPatron repoPatron;

	@Override
	public void añadirPatron(Patron nuevoPatron) {
		repoPatron.save(nuevoPatron);
	}

	@Override
	public void eliminarPatron(int idPatron) {
		repoPatron.deleteById(idPatron);
	}

	@Override
	public List<Patron> mostrarPatrones() {
		return (List<Patron>) repoPatron.findAll();
	}

	@Override
	public void modificarPatron(Patron patronModificar) {
		repoPatron.save(patronModificar);

	}

	@Override
	public Patron mostrarPatronPorId(int idPatron) {
		return repoPatron.findById(idPatron).orElse(null);
	}

}
