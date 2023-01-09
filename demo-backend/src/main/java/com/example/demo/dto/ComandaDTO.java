package com.example.demo.dto;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.example.demo.utils.Constant;

public class ComandaDTO {

	private Integer id;
	
	@NotNull(message = Constant.MESA_REQUIRED)
	private Integer mesa;
	
	@NotNull(message = Constant.NUMEROMENU_REQUIRED)
	private String menus;
	

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

	public String getMenus() {
		return menus;
	}

	public void setMenus(String menus) {
		this.menus = menus;
	}


	
//comentario

	
}
