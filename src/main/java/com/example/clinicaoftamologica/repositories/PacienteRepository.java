package com.example.clinicaoftamologica.repositories;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.clinicaoftamologica.model.Paciente;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long>{}
