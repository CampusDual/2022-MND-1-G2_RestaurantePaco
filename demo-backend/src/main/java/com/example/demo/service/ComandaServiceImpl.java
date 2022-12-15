package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationBuilder;
import com.example.demo.dto.ComandaDTO;
import com.example.demo.dto.mapper.ComandaMapper;
import com.example.demo.entity.Comanda;
import com.example.demo.repository.ComandaRepository;
import com.example.demo.rest.response.DataSourceRESTResponse;

@Service
public class ComandaServiceImpl extends AbstractDemoService implements IComandaService {

	/**
	 * Especificación JPA para {@link Contact}.
	 */
	@Autowired
	private ComandaRepository comandaRepository;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ComandaDTO getComanda(Integer id) {
		Comanda comanda = comandaRepository.findById(id).orElse(null);
		return ComandaMapper.INSTANCE.comandaToComandaDto(comanda);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional(readOnly = true)
	public DataSourceRESTResponse<List<ComandaDTO>> getComandas(AnyPageFilter pageFilter) {
		checkInputParams(pageFilter);
		Page<Comanda> comandas = SpecificationBuilder.selectDistinctFrom(comandaRepository).where(pageFilter)
				.findAll(pageFilter);
		DataSourceRESTResponse<List<ComandaDTO>> datares = new DataSourceRESTResponse<>();
		datares.setTotalElements((int) comandas.getTotalElements());
		List<ComandaDTO> comandaDtoList = ComandaMapper.INSTANCE.comandaToComandaDtoList(comandas.getContent());
		datares.setData(comandaDtoList);
		return datares;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional

	public ComandaDTO createComanda(ComandaDTO createComandaRequestDTO) {
		Comanda newComanda = ComandaMapper.INSTANCE.comandaDTOtoComanda(createComandaRequestDTO);
		Comanda comanda = comandaRepository.save(newComanda);
		return ComandaMapper.INSTANCE.comandaToComandaDto(comanda);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	@Transactional
	public Integer deleteComanda(Integer id) {
		comandaRepository.deleteById(id);
		return id;

	}

	@Override
	public List<ComandaDTO> findAll() {

		List<Comanda> comandas = comandaRepository.findAll();
		return ComandaMapper.INSTANCE.comandaToComandaDtoList(comandas);
	}

	@Override
	public Integer editComanda(ComandaDTO editComandaRequest) {
		Comanda comanda = ComandaMapper.INSTANCE.comandaDTOtoComanda(editComandaRequest);
		Comanda editComanda = comandaRepository.save(fromEditComandaRequest(comanda));
		return editComanda.getId();
	}

}
