package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.demo.entity.Menus;

public interface MenusRepository extends JpaRepository<Menus, Integer>, JpaSpecificationExecutor<Menus> {

}
