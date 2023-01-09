package com.example.demo.service;

import com.borjaglez.springify.repository.filter.IPageFilter;
import com.example.demo.dto.ComandaDTO;
import com.example.demo.entity.Comanda;
import com.example.demo.entity.Menus;
import com.example.demo.exception.DemoException;
import com.example.demo.rest.model.QuerySortPaginationRequest;
import com.example.demo.utils.Constant;

public class AbstractDemoService {
	protected void checkInputParams(IPageFilter pageFilter) {
		if (pageFilter.getPageNumber() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	protected void checkInputParams(QuerySortPaginationRequest pageFilter) {
		if (pageFilter.getPageIndex() == null) {
			throw new DemoException(Constant.PAGE_INDEX_REQUIRED);
		}
		if (pageFilter.getPageSize() == null) {
			throw new DemoException(Constant.PAGE_SIZE_REQUIRED);
		}
	}
	
	public Comanda fromEditComandaRequest(Comanda comandaRequest) {
		return new Comanda(comandaRequest.getId(), comandaRequest.getMesa(), comandaRequest.getMenus());
	}
	public Menus fromEditMenusRequest(Menus menusRequest) {
		return new Menus(menusRequest.getIdMenu(),menusRequest.getNombreMenu(),menusRequest.getPlato1(), menusRequest.getPlato2(), menusRequest.getPostre(),
				menusRequest.getPrecio());
	}

	public Comanda fromCreateComandaRequest(ComandaDTO comandaRequest) {
		return  new Comanda(comandaRequest.getMesa(), comandaRequest.getMenus());
	}

}
