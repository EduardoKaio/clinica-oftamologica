package com.example.clinicaoftamologica.repositories;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.clinicaoftamologica.model.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    @Query("SELECT m FROM Medico m LEFT JOIN FETCH m.consultas WHERE m.id = :id")
    Medico findByIdWithConsultas(@Param("id") Long id);

    // Page<Medico> findByDisponivelTrue(Pageable pageable);
}



