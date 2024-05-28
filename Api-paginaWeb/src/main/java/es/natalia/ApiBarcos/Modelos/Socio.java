package es.natalia.ApiBarcos.Modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Entidad para mapear la tabla de socios.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "socios")
public class Socio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idSocio;
	private String nombre;
	private String apellidos;
	private String dni;
	private String telefono;
	private String email;

	private String password;
	private String rol;
}
