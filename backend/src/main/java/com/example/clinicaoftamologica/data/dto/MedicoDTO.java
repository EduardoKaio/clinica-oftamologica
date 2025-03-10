package com.example.clinicaoftamologica.data.dto;

import java.io.Serializable;
import java.util.List;

import org.springframework.hateoas.EntityModel;

public class MedicoDTO extends EntityModel<MedicoDTO> implements Serializable {

    private static final long serialVersionUID = 1L;

    private long id;
    private String nome;
    private String crm;
    private String especialidade;
    private String telefone;
    private String email;
    private List<Long> consultasIds;  // List of Consulta IDs instead of full objects

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getConsultasIds() {
        return consultasIds;
    }

    public void setConsultasIds(List<Long> consultasIds) {
        this.consultasIds = consultasIds;
    }
}
