package net.guides.springboot.registraionlogindemo.Modelos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Entidad para mapear la tabla de patron.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "patron")
public class Patron {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idPatron;
	
	private String nombrePatron;
	
	private String dniPatron;
	
	@OneToMany(mappedBy = "patron", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("patron") // Evita la recursión infinita al serializar
	List<Salida> listaSalida;
	
	
	public Patron(String nombrePatron, String dniPatron) {
		super();
		this.nombrePatron = nombrePatron;
		this.dniPatron = dniPatron;
	}
}
