package es.natalia.ApiBarcos.Modelos;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Entidad para mapear la tabla de salidas.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "salidas")
public class Salida {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idSalida;
	@Column(name = "fchHoraSalida")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private Date fchHoraSalida;
	private String destino;
	@ManyToOne
    @JsonIgnoreProperties("salidas") // Evita la recursión infinita al serializar
	private Barco barco;
	
	@ManyToOne
	@JoinColumn()
    @JsonIgnoreProperties("salidas") // Evita la recursión infinita al serializar
	private Patron patron;

	public Salida(Date fchHoraSalida, String destino, Barco barco, Patron patron) {
		super();
		this.fchHoraSalida = fchHoraSalida;
		this.destino = destino;
		this.barco = barco;
		this.patron = patron;
	}
}
