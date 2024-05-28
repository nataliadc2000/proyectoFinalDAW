package net.guides.springboot.registraionlogindemo.Servicios;

import java.util.List;

import net.guides.springboot.registraionlogindemo.Modelos.Salida;



/**
 * Interfaz de salida donde se encuentran declarados todos los metoso necesarios
 * de barcos para interactuar con la tabla salidas de la bbdd
 */
public interface ISalida {

	/**
	 * Metodo con el que añadimos una nueva salida
	 * 
	 * @param nuevoSalida
	 */
	public void añardirSalida(Salida nuevoSalida);

	/**
	 * Metodo con el que mostramos todas las salidas
	 */
	public List<Salida> mostrarSalidas();

	/*
	 * Metodo con el que eliminamos una salida
	 */
	public void eliminarSalidaPorId(int idSalida);

	/**
	 * Metodo con el que buscamos una salida por su id.
	 * 
	 * @param idSalida
	 * @return
	 */
	public Salida buscarSalidaPorId(int idSalida);

	/**
	 * Metodo con el que modificamos una salida.
	 * 
	 * @param salidaModifica
	 */

	public void modificarSalida(Salida salidaModifica);
	
	
	/**
	 * Metodo para mostrar las salidas de un usuario por su email.
	 */
	public List<Salida> mostrarSalidasPorEmail(String email);
    

}
