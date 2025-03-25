package com.example.clinicaoftamologica.controller.paciente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.clinicaoftamologica.data.dto.MedicoDTO;
import com.example.clinicaoftamologica.services.MedicoServices;
import com.example.clinicaoftamologica.util.MediaType;

@RestController
@RequestMapping("/api/paciente/medico")
public class PacienteMedicoController {

    @Autowired
    private MedicoServices service;

    @GetMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
    @PreAuthorize("hasRole('PACIENTE')")
    public ResponseEntity<PagedModel<EntityModel<MedicoDTO>>> findAvailableMedicos(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction
    ) {
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Direction.DESC : Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "nome"));
        return ResponseEntity.ok(service.findAll(pageable));
    }
}
