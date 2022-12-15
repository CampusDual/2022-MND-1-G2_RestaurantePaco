package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.demo.entity.Comanda;

public interface ComandaRepository extends JpaRepository<Comanda, Integer>, JpaSpecificationExecutor<Comanda> {

}
