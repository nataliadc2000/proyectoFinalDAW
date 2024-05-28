
package net.guides.springboot.registraionlogindemo.Servicios;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import net.guides.springboot.registraionlogindemo.Modelos.Socio;

/**
 * Interfaz de socio donde se encuentran declarados todos los metoso necesarios
 * de barcos para interactuar con la tabla socios de la bbdd
 */
public interface ISocios {


	/***
	 * Interfaz del metodo para eliminar a un socio por su id
	 * @param idSocio
	 */
	public void eliminarSocioPorId(int idSocio);
	/**
	 * Interfaz del metodo para mostrar a un socio por su id
	 * @param idSocio
	 * @return
	 */

	public Socio mostrarSocioPorId(int idSocio);
	/**
	 * Interfaz del metodo para mostrar todos los socios
	 * @return
	 */

	public List<Socio> listasSocios();
	/**
	 * Interfaz del metodo para añadir un socio desde administracion
	 * @param nuevoSocio
	 */

	public void añadirSociosAdmin(Socio nuevoSocio);

	/**
	 * Interfaz dle metodo para añadir socio.
	 * @param nuevoSocio
	 */
	public void añadirSocios(Socio nuevoSocio);

	/**
	 * Interfaz del metodo que devuelve un socio por su email
	 * @param email
	 * @return
	 */
	public Socio mostrarSocioPorEmail(String email);

	/**
	 * Interfaz del metrodo que elimina un socio por su email
	 * @param email
	 */
	public void eliminarSocioEmail(String email);

	/**
	 * Interfaz del metodo que comprueba si existe ese correo en bbdd
	 * @param email
	 * @return
	 */
	public boolean verificarEmailExistente(@PathVariable String email);

}
