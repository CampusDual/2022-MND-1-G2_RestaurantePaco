package com.example.demo.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class MenusDTO {

	private Integer id;
	@NotEmpty(message = Constant.PLATO1_REQUIRED)
	private String plato1;
	
	@NotEmpty(message = Constant.PLATO2_REQUIRED)
	private String plato2;
	
	@NotEmpty(message = Constant.POSTRE_REQUIRED)
	private String postre;
	
	@NotNull(message = Constant.PRECIO_REQUIRED)
	private Integer precio;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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
	


}


