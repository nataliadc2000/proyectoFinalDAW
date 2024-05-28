package net.guides.springboot.registraionlogindemo.Modelos;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad para mapear la tabla de barcos.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="barcos")
public class Barco {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idBarco;
	
	private String numeroMatricula;
	
	private String nombreBarco;
	
	private int numeroAmarre;
	
	private double cuotaMensual;
	
	@ManyToOne
	@JoinColumn
	private Socio socios;
	
    @OneToMany(mappedBy = "barco", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("barco") // Evita la recursión infinita al serializar
    private List<Salida> salidas;
	
	public Barco(String numeroMatricula, String nombreBarco, int numeroAmarre, double cuotaMensual, Socio socios) {
		super();
		this.numeroMatricula = numeroMatricula;
		this.nombreBarco = nombreBarco;
		this.numeroAmarre = numeroAmarre;
		this.cuotaMensual = cuotaMensual;
		this.socios = socios;
	}
	
}
