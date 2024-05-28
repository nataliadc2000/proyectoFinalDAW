package es.natalia.ApiBarcos.Servicios;

import java.util.List;

import es.natalia.ApiBarcos.Modelos.Barco;

/**
 * Interfaz de barco donde se encuentran declarados todos los metoso necesarios de barcos para interactuar con la tabla barcos de la bbdd
 */
public interface IBarco {

	/**
	 * Metodo con el que añadimos un nuevo barco 
	 */
	public void añadirBarco(Barco nuevoBarco);
	/**
	 * Metodo con el que modificamos un barco 
	 */
	public void modificarBarco(Barco barcoActualizado);
	/**
	 * Metodo con el que eliminamos barco 
	 */
	public void eliminarBarco(int idBarco);
	/**
	 * Metodo con el que mostramos todos los barcos 
	 */
	public List<Barco> mostrarBarcos();
	
	/**
	 * Metodo que muestra los barcos por el email.
	 */
	public List<Barco> mostrarBarcosPorEmail(String email);
	/**
	 * Metodo con el que mostramos un barco por su id
	 */
	public Barco buscarBarcoPorId(int idBarco);

	
}
