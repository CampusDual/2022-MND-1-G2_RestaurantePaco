package com.example.demo.dto;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class ComandaDTO {

	private Integer id;
	
	@NotEmpty(message = Constant.MESA_REQUIRED)
	private Integer mesa;
	
	@NotEmpty(message = Constant.NUMEROMENU_REQUIRED)
	private Integer menus;
	
	@NotNull(message = Constant.CANTIDADDEMENUS_REQUIRED)
	private Integer numeromenus;

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

	public Integer getNumeromenus() {
		return numeromenus;
	}

	public void setNumeromenus(Integer numeromenus) {
		this.numeromenus = numeromenus;
	}
	
//comentario

	
}
