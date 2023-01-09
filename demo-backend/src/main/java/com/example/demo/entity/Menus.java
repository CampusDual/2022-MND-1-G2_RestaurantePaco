package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "menus")
public class Menus implements Serializable{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idMenu; // cambiado por Angy
	
	@Column(nullable=false)
	private String nombreMenu;
	
	@Column(nullable=false)
	private String plato1;
	
	@Column(nullable=false)
	private String plato2;
	
	@Column(nullable=false)
	private String postre;
	
	
	@Column(nullable=false)
	private Integer precio;

	public Menus() {
	}
	
	
	
	public Menus(String nombreMenu,String plato1, String plato2, String postre, Integer precio) {
		this.nombreMenu = nombreMenu; 
		this.plato1 = plato1;
		this.plato2 = plato2;
		this.postre = postre;
		this.precio = precio;
	}


	public Menus(Integer idMenu,String nombreMenu, String plato1, String plato2, String postre, Integer precio) {
		this(nombreMenu,plato1, plato2, postre,precio);
		this.idMenu = idMenu;
	
	
	}
	public Integer getIdMenu() {
		return idMenu;
	}



	public void setIdMenu(Integer idMenu) {
		this.idMenu = idMenu;
	}



	public String getNombreMenu() {
		return nombreMenu;
	}



	public void setNombreMenu(String nombreMenu) {
		this.nombreMenu = nombreMenu;
	}



	public String getPlato1() {
		return plato1;
	}



	public void setPlato1(String plato1) {
		this.plato1 = plato1;
	}



	public String getPlato2() {
		return plato2;
	}



	public void setPlato2(String plato2) {
		this.plato2 = plato2;
	}



	public String getPostre() {
		return postre;
	}



	public void setPostre(String postre) {
		this.postre = postre;
	}



	public Integer getPrecio() {
		return precio;
	}



	public void setPrecio(Integer precio) {
		this.precio = precio;
	}
	private static final long serialVersionUID = 1L;
	

}