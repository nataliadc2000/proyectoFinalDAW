package es.natalia.ApiBarcos.Servicios;

import java.util.List;

import es.natalia.ApiBarcos.Modelos.Patron;
/**
 * Interfaz de patron donde se encuentran declarados todos los metoso necesarios de barcos para interactuar con la tabla patron de la bbdd
 */
public interface IPatron {
	/**
	 * Metodo con el que añadimos un nuevo patron 
	 */
	public void añadirPatron(Patron nuevoPatron);
	/**
	 * Metodo con el que eliminamos a un patron 
	 */
	public void eliminarPatron(int idPatron);
	/**
	 * Metodo con el mostramos todos los patrones 
	 */
	public List<Patron> mostrarPatrones();
	/**
	 * Metodo con el que modificamos a un patron 
	 */
	public void modificarPatron(Patron patronModificar);
	/**
	 * Metodo con el que mostramos a un patron por su id 
	 */
	public Patron mostrarPatronPorId(int idPatron);
}
