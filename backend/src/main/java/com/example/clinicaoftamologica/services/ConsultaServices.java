package com.example.clinicaoftamologica.services;

import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.controller.ConsultaController;
import com.example.clinicaoftamologica.data.dto.ConsultaDTO;
import com.example.clinicaoftamologica.data.dto.MedicoDTO;
import com.example.clinicaoftamologica.data.dto.PacienteDTO;
import com.example.clinicaoftamologica.excepetions.ResourceNotFoundException;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.model.Consulta;
import com.example.clinicaoftamologica.model.Medico;
import com.example.clinicaoftamologica.model.Paciente;
import com.example.clinicaoftamologica.repositories.ConsultaRepository;
import com.example.clinicaoftamologica.repositories.MedicoRepository;
import com.example.clinicaoftamologica.repositories.PacienteRepository;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class ConsultaServices {

    private Logger logger = Logger.getLogger(ConsultaServices.class.getName());

    @Autowired
    private ConsultaRepository repository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PagedResourcesAssembler<ConsultaDTO> assembler;

    public PagedModel<EntityModel<ConsultaDTO>> findAll(Pageable pageable) {
        logger.info("Buscando todas as consultas com paginação!");
    
        var consultasPage = repository.findAll(pageable); // Buscando consultas com paginação
    
        var consultaDTOs = consultasPage.map(consulta -> {
            // Mapeamento manual do MedicoDTO
            MedicoDTO medicoDTO = new MedicoDTO();
            if (consulta.getMedico() != null) {
                medicoDTO.setId(consulta.getMedico().getId());
                medicoDTO.setNome(consulta.getMedico().getNome());
                medicoDTO.setCrm(consulta.getMedico().getCrm());
                medicoDTO.setEspecialidade(consulta.getMedico().getEspecialidade());
                medicoDTO.setTelefone(consulta.getMedico().getTelefone());
                medicoDTO.setEmail(consulta.getMedico().getEmail());
            }
    
            // Mapeamento manual do PacienteDTO
            PacienteDTO pacienteDTO = new PacienteDTO();
            if (consulta.getPaciente() != null) {
                pacienteDTO.setId(consulta.getPaciente().getId());
                pacienteDTO.setNome(consulta.getPaciente().getNome());
                pacienteDTO.setDataDeNascimento(consulta.getPaciente().getDataDeNascimento());
                pacienteDTO.setCpf(consulta.getPaciente().getCpf());
                pacienteDTO.setEndereco(consulta.getPaciente().getEndereco());
                pacienteDTO.setGenero(consulta.getPaciente().getGenero());
                pacienteDTO.setCelular(consulta.getPaciente().getCelular());
                pacienteDTO.setEmail(consulta.getPaciente().getEmail());
                pacienteDTO.setHistoricoMedico(consulta.getPaciente().getHistoricoMedico());
            }
    
            // Mapeamento do ConsultaDTO com os dados do MedicoDTO e PacienteDTO
            ConsultaDTO dto = new ConsultaDTO(consulta.getId(), medicoDTO, pacienteDTO, consulta.getDataHora(), consulta.getObservacoes());
            dto.add(linkTo(methodOn(ConsultaController.class).findById(consulta.getId())).withSelfRel());
            return dto;
        });
    
        // Link para a consulta de todas as consultas
        Link findAllLink = linkTo(
                methodOn(ConsultaController.class)
                        .findAll(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort().toString())
        ).withSelfRel();
    
        return assembler.toModel(consultaDTOs, findAllLink);
    }
    
    public ConsultaDTO findById(Long id) {
        logger.info("Buscando uma consulta pelo ID!");
    
        var consulta = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhuma consulta encontrada para este ID!"));
    
        // Mapeamento manual
        MedicoDTO medicoDTO = new MedicoDTO();
        if (consulta.getMedico() != null) {
            medicoDTO.setId(consulta.getMedico().getId());
            medicoDTO.setNome(consulta.getMedico().getNome());
            medicoDTO.setCrm(consulta.getMedico().getCrm());
            medicoDTO.setEspecialidade(consulta.getMedico().getEspecialidade());
            medicoDTO.setTelefone(consulta.getMedico().getTelefone());
            medicoDTO.setEmail(consulta.getMedico().getEmail());
        }
    
        PacienteDTO pacienteDTO = new PacienteDTO();
        if (consulta.getPaciente() != null) {
            pacienteDTO.setId(consulta.getPaciente().getId());
            pacienteDTO.setNome(consulta.getPaciente().getNome());
            pacienteDTO.setDataDeNascimento(consulta.getPaciente().getDataDeNascimento());
            pacienteDTO.setCpf(consulta.getPaciente().getCpf());
            pacienteDTO.setEndereco(consulta.getPaciente().getEndereco());
            pacienteDTO.setGenero(consulta.getPaciente().getGenero());
            pacienteDTO.setCelular(consulta.getPaciente().getCelular());
            pacienteDTO.setEmail(consulta.getPaciente().getEmail());
            pacienteDTO.setHistoricoMedico(consulta.getPaciente().getHistoricoMedico());
        }
    
        // Retorno do DTO com mapeamento manual
        ConsultaDTO dto = new ConsultaDTO(consulta.getId(), medicoDTO, pacienteDTO, consulta.getDataHora(), consulta.getObservacoes());
        dto.add(linkTo(methodOn(ConsultaController.class).findById(id)).withSelfRel());
        return dto;
    }
    

    
    public ConsultaDTO create(ConsultaDTO consultaDTO) {
        if (consultaDTO == null) {
            throw new ResourceNotFoundException("Objeto de consulta não pode ser nulo.");
        }

        logger.info("Criando uma consulta!");
        var entity = DozerMapper.parseObject(consultaDTO, Consulta.class);

        var savedEntity = repository.save(entity);
        var dto = DozerMapper.parseObject(savedEntity, ConsultaDTO.class);

        // Preencher os objetos 'medico' e 'paciente' com as informações completas após criação
        if (savedEntity.getMedico() != null) {
            MedicoDTO medicoDTO = new MedicoDTO();
            medicoDTO.setId(savedEntity.getMedico().getId());
            medicoDTO.setNome(savedEntity.getMedico().getNome());
            medicoDTO.setCrm(savedEntity.getMedico().getCrm());
            medicoDTO.setEspecialidade(savedEntity.getMedico().getEspecialidade());
            medicoDTO.setTelefone(savedEntity.getMedico().getTelefone());
            medicoDTO.setEmail(savedEntity.getMedico().getEmail());
            dto.setMedico(medicoDTO);
        }

        if (savedEntity.getPaciente() != null) {
            PacienteDTO pacienteDTO = new PacienteDTO();
            pacienteDTO.setId(savedEntity.getPaciente().getId());
            pacienteDTO.setNome(savedEntity.getPaciente().getNome());
            pacienteDTO.setDataDeNascimento(savedEntity.getPaciente().getDataDeNascimento());
            pacienteDTO.setCpf(savedEntity.getPaciente().getCpf());
            pacienteDTO.setEndereco(savedEntity.getPaciente().getEndereco());
            pacienteDTO.setGenero(savedEntity.getPaciente().getGenero());
            pacienteDTO.setCelular(savedEntity.getPaciente().getCelular());
            pacienteDTO.setEmail(savedEntity.getPaciente().getEmail());
            pacienteDTO.setHistoricoMedico(savedEntity.getPaciente().getHistoricoMedico());
            dto.setPaciente(pacienteDTO);
        }

        dto.add(linkTo(methodOn(ConsultaController.class).findById(dto.getId())).withSelfRel());
        return dto;
    }

    public ConsultaDTO update(ConsultaDTO consultaDTO) {
        if (consultaDTO == null) {
            throw new ResourceNotFoundException("Objeto de consulta não pode ser nulo.");
        }
    
        logger.info("Atualizando uma consulta!");
    
        // Verificando se a consulta existe
        var entity = repository.findById(consultaDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
    
        // Convertendo o MedicoDTO e PacienteDTO para as entidades completas
        Medico medico = DozerMapper.parseObject(consultaDTO.getMedico(), Medico.class);
        Paciente paciente = DozerMapper.parseObject(consultaDTO.getPaciente(), Paciente.class);
    
        // Buscando as entidades completas do médico e paciente no banco de dados
        medico = medicoRepository.findById(medico.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado!"));
    
        paciente = pacienteRepository.findById(paciente.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado!"));
    
        // Atualizando os campos da consulta
        entity.setMedico(medico);
        entity.setPaciente(paciente);
        entity.setDataHora(consultaDTO.getDataHora());
        entity.setObservacoes(consultaDTO.getObservacoes());
    
        // Salvando a consulta atualizada
        var updatedEntity = repository.save(entity);
    
        // Convertendo a entidade de volta para o DTO
        var dto = DozerMapper.parseObject(updatedEntity, ConsultaDTO.class);
    
        // Preenchendo os objetos 'medico' e 'paciente' com as informações completas após atualização
        if (updatedEntity.getMedico() != null) {
            MedicoDTO medicoDTO = new MedicoDTO();
            medicoDTO.setId(updatedEntity.getMedico().getId());
            medicoDTO.setNome(updatedEntity.getMedico().getNome());
            medicoDTO.setCrm(updatedEntity.getMedico().getCrm());
            medicoDTO.setEspecialidade(updatedEntity.getMedico().getEspecialidade());
            medicoDTO.setTelefone(updatedEntity.getMedico().getTelefone());
            medicoDTO.setEmail(updatedEntity.getMedico().getEmail());
            dto.setMedico(medicoDTO);
        }
    
        if (updatedEntity.getPaciente() != null) {
            PacienteDTO pacienteDTO = new PacienteDTO();
            pacienteDTO.setId(updatedEntity.getPaciente().getId());
            pacienteDTO.setNome(updatedEntity.getPaciente().getNome());
            pacienteDTO.setDataDeNascimento(updatedEntity.getPaciente().getDataDeNascimento());
            pacienteDTO.setCpf(updatedEntity.getPaciente().getCpf());
            pacienteDTO.setEndereco(updatedEntity.getPaciente().getEndereco());
            pacienteDTO.setGenero(updatedEntity.getPaciente().getGenero());
            pacienteDTO.setCelular(updatedEntity.getPaciente().getCelular());
            pacienteDTO.setEmail(updatedEntity.getPaciente().getEmail());
            pacienteDTO.setHistoricoMedico(updatedEntity.getPaciente().getHistoricoMedico());
            dto.setPaciente(pacienteDTO);
        }
    
        // Adicionando o link para o método de consulta pelo ID
        dto.add(linkTo(methodOn(ConsultaController.class).findById(dto.getId())).withSelfRel());
    
        return dto;
    }

    public void delete(Long id) {
        logger.info("Deletando uma consulta!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
        repository.delete(entity);
    }
    public long getConsultaCount() {
        return repository.count(); // Retorna o número de pacientes na tabela
    }
}
