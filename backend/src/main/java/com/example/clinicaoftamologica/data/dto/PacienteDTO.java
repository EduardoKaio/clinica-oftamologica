package com.example.clinicaoftamologica.data.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class PacienteDTO extends RepresentationModel<PacienteDTO> implements Serializable {

    private static final long serialVersionUID = 1L;

    private long id;
    private String nome;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataDeNascimento;
    
    private String cpf;
    private String endereco;
    private String genero;
    private String celular;
    private String email;
    private String historicoMedico;
    private List<Long> consultasIds;  // List of Consulta IDs instead of full objects

    public List<Long> getConsultasIds() {
        return consultasIds;
    }

    public void setConsultasIds(List<Long> consultasIds) {
        this.consultasIds = consultasIds;
    }

    // Getters e Setters

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

    public Date getDataDeNascimento() {
        return dataDeNascimento;
    }

    public void setDataDeNascimento(Date dataDeNascimento) {
        this.dataDeNascimento = dataDeNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHistoricoMedico() {
        return historicoMedico;
    }

    public void setHistoricoMedico(String historicoMedico) {
        this.historicoMedico = historicoMedico;
    }
}
