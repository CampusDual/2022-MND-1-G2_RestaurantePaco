package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.MenusDTO;
import com.example.demo.dto.mapper.MenusMapper;
import com.example.demo.entity.Menus;
import com.example.demo.repository.MenusRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class MenusServiceImpl extends AbstractDemoService implements IMenusService {

	/**
	 * Especificación JPA para {@link Contact}.
	 */
	@Autowired
	private MenusRepository menusRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public MenusDTO getMenus(Integer id) {
		Menus menus = menusRepository.findById(id).orElse(null);
		return MenusMapper.INSTANCE.menusToMenusDto(menus);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<MenusDTO>> getMenus(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Menus> menus = SpecificationBuilder.selectDistinctFrom(menusRepository).where(pageFilter)
				.findAll(pageFilter);
		DataSourceRESTResponse<List<MenusDTO>> datares = new DataSourceRESTResponse<>();
		datares.setTotalElements((int) menus.getTotalElements());
		List<MenusDTO> menusDtoList = MenusMapper.INSTANCE.menusTomenusDtoList(menus.getContent());
		datares.setData(menusDtoList);
		return datares;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional

	public MenusDTO createMenus(MenusDTO createMenusRequestDTO) {
		Menus newMenus = MenusMapper.INSTANCE.menusDTOtomenus(createMenusRequestDTO);
		Menus menus = menusRepository.save(newMenus);
		return MenusMapper.INSTANCE.menusToMenusDto(menus);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public Integer deleteMenus(Integer id) {
		menusRepository.deleteById(id);
		return id;

	}

	@Override
	public List<MenusDTO> findAll() {

		List<Menus> menus = menusRepository.findAll();
		return MenusMapper.INSTANCE.menusTomenusDtoList(menus);
	}

	@Override
	public Integer editMenus(MenusDTO editMenusRequest) {
		Menus menus = MenusMapper.INSTANCE.menusDTOtomenus(editMenusRequest);
		Menus editMenus = menusRepository.save(fromEditMenusRequest(menus));
		return editMenus.getIdMenu();
	
	}

}
