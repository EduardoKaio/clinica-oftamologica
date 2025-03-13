package com.example.clinicaoftamologica.controller;

import java.util.HashMap;
import java.util.Map;

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

import com.example.clinicaoftamologica.data.dto.ConsultaDTO;
import com.example.clinicaoftamologica.services.ConsultaServices;
import com.example.clinicaoftamologica.util.MediaType;

@RestController
@RequestMapping("/api/consulta")
public class ConsultaController {

    @Autowired
    private ConsultaServices service;

    @GetMapping(produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedModel<EntityModel<ConsultaDTO>>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "12") Integer size,
            @RequestParam(value = "direction", defaultValue = "asc") String direction
    ) {
        var sortDirection = "desc".equalsIgnoreCase(direction) ? Direction.DESC : Direction.ASC;
        // Supondo que a ordenação seja pela propriedade "dataHora". Altere conforme a necessidade.
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "dataHora"));
        return ResponseEntity.ok(service.findAll(pageable));
    }

    @GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConsultaDTO> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML },
            produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
            @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConsultaDTO> create(@RequestBody ConsultaDTO consulta) {
        return ResponseEntity.ok(service.create(consulta));
    }

    @PutMapping(value="/{id}", consumes = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML },
            produces = { MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML, MediaType.APPLICATION_YML })
            @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ConsultaDTO> update(@RequestBody ConsultaDTO consulta) {
        return ResponseEntity.ok(service.update(consulta));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/count")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Long> getConsultaCount() {
        long count = service.getConsultaCount();
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return response;
    }
}
