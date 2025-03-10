package com.example.clinicaoftamologica.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.clinicaoftamologica.model.Admin;
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long>{}
