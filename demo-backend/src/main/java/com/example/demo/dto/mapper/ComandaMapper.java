package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.ComandaDTO;
import com.example.demo.entity.Comanda;

@Mapper
public interface ComandaMapper {

    ComandaMapper INSTANCE = Mappers.getMapper( ComandaMapper.class );
 
    ComandaDTO comandaToComandaDto(Comanda comanda);
    
    List<ComandaDTO> comandaToComandaDtoList(List<Comanda> comanda);
    
    Comanda comandaDTOtoComanda(ComandaDTO comandadto);




}
