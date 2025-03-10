package com.example.clinicaoftamologica.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.clinicaoftamologica.model.Consulta;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long>{}
