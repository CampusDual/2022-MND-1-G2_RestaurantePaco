package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comanda")
public class Comanda implements Serializable{


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable=false)
	private Integer mesa;
	
	@Column(nullable=false)
	private Integer menus;
	
	

	public Comanda() {
	}
	
	public Comanda( Integer mesa, Integer menus) {
		this.mesa = mesa;
		this.menus = menus;
		
	}

	public Comanda(Integer id, Integer mesa, Integer menus ) {
	
		this.id = id;
	}

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getMesa() {
		return mesa;
	}

	public void setMesa(Integer mesa) {
		this.mesa = mesa;
	}

	public Integer getMenus() {
		return menus;
	}

	public void setMenus(Integer menus) {
		this.menus = menus;

	
	}
	private static final long serialVersionUID = 1L;
	
}