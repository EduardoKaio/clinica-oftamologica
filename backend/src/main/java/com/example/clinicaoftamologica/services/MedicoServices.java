package com.example.clinicaoftamologica.services;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.controller.admin.MedicoController;
import com.example.clinicaoftamologica.controller.paciente.PacienteMedicoController;
import com.example.clinicaoftamologica.data.dto.MedicoDTO;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import com.example.clinicaoftamologica.excepetions.RequiredObjectIsNullException;
import com.example.clinicaoftamologica.excepetions.ResourceNotFoundException;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.model.Medico;
import com.example.clinicaoftamologica.repositories.MedicoRepository;
import jakarta.transaction.Transactional;

@Service
public class MedicoServices {

    private Logger logger = Logger.getLogger(MedicoServices.class.getName());

    @Autowired
    private MedicoRepository repository;

    @Autowired
    private PagedResourcesAssembler<MedicoDTO> assembler;

    @Transactional
    public PagedModel<EntityModel<MedicoDTO>> findAll(Pageable pageable) {
    
        logger.info("Encontrando todos os médicos!");
    
        var medicosPage = repository.findAll(pageable);
    
        var medicoDTOs = medicosPage.map(m -> {
            MedicoDTO dto = DozerMapper.parseObject(m, MedicoDTO.class);
    
            // Adicionando os IDs das consultas
            if (m.getConsultas() != null && !m.getConsultas().isEmpty()) {
                List<Long> consultasIds = m.getConsultas().stream()
                    .map(consulta -> consulta.getId())
                    .collect(Collectors.toList());
                dto.setConsultasIds(consultasIds);
            }
    
            dto.add(linkTo(methodOn(MedicoController.class).findById(dto.getId())).withSelfRel());
            return dto;
        });
    
        Link findAllLink = linkTo(
                methodOn(MedicoController.class)
                        .findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")
        ).withSelfRel();
    
        return assembler.toModel(medicoDTOs, findAllLink);
    }

    public MedicoDTO findById(Long id) {
        logger.info("Encontrando um médico com suas consultas!");

        var entity = repository.findByIdWithConsultas(id);
        if (entity == null) {
            throw new ResourceNotFoundException("Nenhum registro encontrado para este ID!");
        }

        var dto = DozerMapper.parseObject(entity, MedicoDTO.class);

        // Adicionando os IDs das consultas
        if (entity.getConsultas() != null && !entity.getConsultas().isEmpty()) {
            List<Long> consultasIds = entity.getConsultas().stream()
                .map(consulta -> consulta.getId())
                .collect(Collectors.toList());
            dto.setConsultasIds(consultasIds);
        }

        dto.add(linkTo(methodOn(MedicoController.class).findById(id)).withSelfRel());
        return dto;
    }

    public MedicoDTO create(MedicoDTO medicoDTO) {

        if (medicoDTO == null) throw new RequiredObjectIsNullException();

        logger.info("Criando um médico!");
        var entity = DozerMapper.parseObject(medicoDTO, Medico.class);

        var savedEntity = repository.save(entity);
        var dto = DozerMapper.parseObject(savedEntity, MedicoDTO.class);
        dto.add(linkTo(methodOn(MedicoController.class).findById(dto.getId())).withSelfRel());
        return dto;
    }
    @Transactional
    public MedicoDTO update(MedicoDTO medicoDTO) {

        if (medicoDTO == null) throw new RequiredObjectIsNullException();

        logger.info("Atualizando um médico!");
        var entity = repository.findById(medicoDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));

        entity.setNome(medicoDTO.getNome());
        entity.setCrm(medicoDTO.getCrm());
        entity.setEspecialidade(medicoDTO.getEspecialidade());
        entity.setTelefone(medicoDTO.getTelefone());
        entity.setEmail(medicoDTO.getEmail());

        var updatedEntity = repository.save(entity);
        var dto = DozerMapper.parseObject(updatedEntity, MedicoDTO.class);
        dto.add(linkTo(methodOn(MedicoController.class).findById(dto.getId())).withSelfRel());
        return dto;
    }

    public void delete(Long id) {
        logger.info("Deletando um médico!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
        repository.delete(entity);
    }
    public long getMedicoCount() {
        return repository.count(); // Retorna o número de pacientes na tabela
    }
        
}
