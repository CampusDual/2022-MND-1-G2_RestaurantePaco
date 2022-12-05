package com.example.demo.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.demo.dto.MenusDTO;
import com.example.demo.entity.Menus;

@Mapper
public interface MenusMapper {

    MenusMapper INSTANCE = Mappers.getMapper( MenusMapper.class );
 
    MenusDTO menusToMenusDto(Menus menus);
    
    List<MenusDTO> menusTomenusDtoList(List<Menus> menus);
    
    Menus menusDTOtomenus(MenusDTO menusdto);


}
