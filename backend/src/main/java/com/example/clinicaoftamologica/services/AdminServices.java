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

import com.example.clinicaoftamologica.controller.AdminController;
import com.example.clinicaoftamologica.data.vo.AdminVO;
import com.example.clinicaoftamologica.excepetions.RequiredObjectIsNullException;
import com.example.clinicaoftamologica.excepetions.ResourceNotFoundException;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.model.Admin;
import com.example.clinicaoftamologica.repositories.AdminRepository;

@Service
public class AdminServices {

    private Logger logger = Logger.getLogger(AdminServices.class.getName());

    @Autowired
    private AdminRepository repository;

    @Autowired
    private PagedResourcesAssembler<AdminVO> assembler;

    public PagedModel<EntityModel<AdminVO>> findAll(Pageable pageable) {

        logger.info("Encontrando todos os administradores!");

        var adminPage = repository.findAll(pageable);
        var adminVOs = adminPage.map(a -> DozerMapper.parseObject(a, AdminVO.class));
        
        adminVOs.map(a -> a.add(linkTo(methodOn(AdminController.class).findById(a.getId())).withSelfRel()));

        Link findAllLink = linkTo(
                methodOn(AdminController.class)
                        .findAll(pageable.getPageNumber(), pageable.getPageSize(), "asc")
        ).withSelfRel();

        return assembler.toModel(adminVOs, findAllLink);
    }

    public AdminVO findById(Long id) {

        logger.info("Encontrando um administrador!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));

        var vo = DozerMapper.parseObject(entity, AdminVO.class);
        vo.add(linkTo(methodOn(AdminController.class).findById(id)).withSelfRel());
        return vo;
    }

    public AdminVO create(AdminVO admin) {

        if (admin == null) throw new RequiredObjectIsNullException();

        logger.info("Criando um administrador!");
        var entity = DozerMapper.parseObject(admin, Admin.class);

        var vo = DozerMapper.parseObject(repository.save(entity), AdminVO.class);
        vo.add(linkTo(methodOn(AdminController.class).findById(vo.getId())).withSelfRel());
        return vo;
    }

    public AdminVO update(AdminVO admin) {

        if (admin == null) throw new RequiredObjectIsNullException();

        logger.info("Atualizando um administrador!");
        var entity = repository.findById(admin.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));

        entity.setId(admin.getId());
        entity.setNome(admin.getNome());
        entity.setEmail(admin.getEmail());
        entity.setSenha(admin.getSenha());

        var vo = DozerMapper.parseObject(repository.save(entity), AdminVO.class);
        vo.add(linkTo(methodOn(AdminController.class).findById(vo.getId())).withSelfRel());
        return vo;
    }

    public void delete(Long id) {

        logger.info("Deletando um administrador!");

        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Nenhum registro encontrado para este ID!"));
        repository.delete(entity);
    }
}
