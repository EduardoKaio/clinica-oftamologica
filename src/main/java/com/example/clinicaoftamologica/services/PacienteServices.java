package com.example.clinicaoftamologica.services;

import java.util.logging.Logger;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.controller.PacienteController;
import com.example.clinicaoftamologica.data.vo.PacienteVO;
import com.example.clinicaoftamologica.excepetions.RequiredObjectIsNullException;
import com.example.clinicaoftamologica.excepetions.ResourceNotFoundException;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.model.Paciente;
import com.example.clinicaoftamologica.repositories.PacienteRepository;

@Service
public class PacienteServices {
    
    private Logger logger = Logger.getLogger(PacienteServices.class.getName());
    
    @Autowired
	PacienteRepository repository;

	@Autowired
	PagedResourcesAssembler<PacienteVO> assembler;

    public PagedModel<EntityModel<PacienteVO>> findAll(Pageable pageable) {

		logger.info("Encontrando todos os paciente!");

		var pacientesPage = repository.findAll(pageable);

		var pacienteVOs = pacientesPage.map(p -> DozerMapper.parseObject(p, PacienteVO.class));
		pacienteVOs.map(p -> p.add(linkTo(methodOn(PacienteController.class).findById(p.getId())).withSelfRel()));
		
		Link findAllLink = linkTo(
		          methodOn(PacienteController.class)
		          	.findAll(pageable.getPageNumber(),
	                         pageable.getPageSize(),
	                         "asc")).withSelfRel();
		
		return assembler.toModel(pacienteVOs, findAllLink);
	}

	public PacienteVO findById(Long id) {
		
		logger.info("Encontrando um Paciente");
			
		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
		
		var vo = DozerMapper.parseObject(entity, PacienteVO.class);
		vo.add(linkTo(methodOn(PacienteController.class).findById(id)).withSelfRel());
		return vo;
	}

	public PacienteVO create(PacienteVO paciente) {
		
		if (paciente == null) throw new RequiredObjectIsNullException();
		
		logger.info("Criando um paciente!");
		var entity = DozerMapper.parseObject(paciente, Paciente.class);
				
		var vo = DozerMapper.parseObject(repository.save(entity),  PacienteVO.class);
		vo.add(linkTo(methodOn(PacienteController.class).findById(vo.getId())).withSelfRel());
		return vo;
	}
	
	public PacienteVO update(PacienteVO paciente) {
		if (paciente == null) throw new RequiredObjectIsNullException();
		
		logger.info("Atualizando um paciente!");
		var entity = repository.findById(paciente.getId())
			.orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
		
		entity.setId(paciente.getId());
        entity.setNome(paciente.getNome());
        entity.setDataDeNascimento(paciente.getDataDeNascimento());
        entity.setCpf(paciente.getEndereco());
        entity.setEndereco(paciente.getEndereco());
        entity.setGenero(paciente.getGenero());
        entity.setCelular(paciente.getCelular());
        entity.setHistoricoMedico(paciente.getHistoricoMedico());
		
		var vo = DozerMapper.parseObject(repository.save(entity),  PacienteVO.class);
		vo.add(linkTo(methodOn(PacienteController.class).findById(vo.getId())).withSelfRel());
		return vo;
	}
	
	public void delete(Long id) {
		logger.info("Deletando um paciente!");
		
		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
		repository.delete(entity);
	}
}
