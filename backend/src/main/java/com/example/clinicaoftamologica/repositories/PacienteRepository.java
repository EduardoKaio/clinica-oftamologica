package com.example.clinicaoftamologica.repositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.clinicaoftamologica.model.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query("SELECT p FROM Paciente p LEFT JOIN FETCH p.consultas WHERE p.id = :id")
    Optional<Paciente> findByIdWithConsultas(Long id);
    
}
