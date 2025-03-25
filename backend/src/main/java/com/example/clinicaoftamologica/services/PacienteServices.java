package com.example.clinicaoftamologica.services;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.controller.admin.MedicoController;
import com.example.clinicaoftamologica.controller.admin.PacienteController;
import com.example.clinicaoftamologica.data.dto.PacienteDTO;
import com.example.clinicaoftamologica.excepetions.RequiredObjectIsNullException;
import com.example.clinicaoftamologica.excepetions.ResourceNotFoundException;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.mapper.custom.PacienteMapper;
import com.example.clinicaoftamologica.model.Paciente;
import com.example.clinicaoftamologica.repositories.PacienteRepository;

import jakarta.transaction.Transactional;

@Service
public class PacienteServices {

    private Logger logger = Logger.getLogger(PacienteServices.class.getName());
    
    @Autowired
    private PacienteRepository repository;

    @Autowired
    private PagedResourcesAssembler<PacienteDTO> assembler;

    @Transactional
    public PagedModel<EntityModel<PacienteDTO>> findAll(Pageable pageable) {
        logger.info("Encontrando todos os pacientes!");

        // Obtendo a página de pacientes
        var pacientesPage = repository.findAll(pageable);

        // Mapeando os pacientes para PacienteDTO
        var pacienteDTOs = pacientesPage.map(p -> {
            // Convertendo paciente para PacienteDTO
            PacienteDTO pacienteDTO = DozerMapper.parseObject(p, PacienteDTO.class);

            // Adicionando os IDs das consultas (caso o paciente tenha consultas associadas)
            if (p.getConsultas() != null && !p.getConsultas().isEmpty()) {
                List<Long> consultasIds = p.getConsultas().stream()
                    .map(consulta -> consulta.getId())
                    .collect(Collectors.toList());
                pacienteDTO.setConsultasIds(consultasIds);
            }

            // Adicionando o link para o próprio recurso do paciente
            pacienteDTO.add(linkTo(methodOn(PacienteController.class).findById(pacienteDTO.getId())).withSelfRel());

            return pacienteDTO;
        });

        // Adicionando o link para a lista de pacientes
        Link findAllLink = linkTo(
                methodOn(PacienteController.class)
                        .findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")
        ).withSelfRel();

        // Retornando a lista de DTOs de pacientes com os links de HATEOAS
        return assembler.toModel(pacienteDTOs, findAllLink);
    }

    public PacienteDTO findById(Long id) {
        logger.info("Encontrando um paciente com consultas");

        var entity = repository.findByIdWithConsultas(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));

        var dto = PacienteMapper.convertEntityToDTO(entity);
        dto.add(linkTo(methodOn(PacienteController.class).findById(id)).withSelfRel());
        return dto;
    }

	public PacienteDTO create(PacienteDTO pacienteDTO) {
        if (pacienteDTO == null) throw new RequiredObjectIsNullException();

        logger.info("Criando um paciente!");
        var entity = DozerMapper.parseObject(pacienteDTO, Paciente.class);

        var savedEntity = repository.save(entity);
        var dto = DozerMapper.parseObject(savedEntity, PacienteDTO.class);
        dto.add(linkTo(methodOn(MedicoController.class).findById(dto.getId())).withSelfRel());
        return dto;
    }

    @Transactional
    public PacienteDTO update(PacienteDTO pacienteDTO) {
        if (pacienteDTO == null) throw new RequiredObjectIsNullException();

        logger.info("Atualizando um paciente!");

        var entity = repository.findById(pacienteDTO.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));

        // Atualizar os campos necessários
        entity.setNome(pacienteDTO.getNome());
        entity.setDataDeNascimento(pacienteDTO.getDataDeNascimento());
        entity.setCpf(pacienteDTO.getCpf());
        entity.setEndereco(pacienteDTO.getEndereco());
        entity.setGenero(pacienteDTO.getGenero());
        entity.setCelular(pacienteDTO.getCelular());
        entity.setEmail(pacienteDTO.getEmail());
        entity.setHistoricoMedico(pacienteDTO.getHistoricoMedico());

        var updatedEntity = repository.save(entity);
        var dto = PacienteMapper.convertEntityToDTO(updatedEntity);
        dto.add(linkTo(methodOn(PacienteController.class).findById(dto.getId())).withSelfRel());
        return dto;
    }

    public void delete(Long id) {
        logger.info("Deletando um paciente!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
        repository.delete(entity);
    }
    public long getPatientCount() {
        return repository.count(); // Retorna o número de pacientes na tabela
    }
}

