package com.example.clinicaoftamologica.data.vo;

import java.io.Serializable;
import java.util.List;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "nome", "crm", "especialidade", "telefone", "email", "consultas"})
public class MedicoVO extends RepresentationModel<MedicoVO> implements Serializable {

    private static final long serialVersionUID = 1L;

    private long id;
    private String nome;
    private String crm;
    private String especialidade;
    private String telefone;
    private String email;
    private List<ConsultaVO> consultas;

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

    public List<ConsultaVO> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<ConsultaVO> consultas) {
        this.consultas = consultas;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = super.hashCode();
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((crm == null) ? 0 : crm.hashCode());
        result = prime * result + ((especialidade == null) ? 0 : especialidade.hashCode());
        result = prime * result + ((telefone == null) ? 0 : telefone.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((consultas == null) ? 0 : consultas.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!super.equals(obj))
            return false;
        if (getClass() != obj.getClass())
            return false;
        MedicoVO other = (MedicoVO) obj;
        if (id != other.id)
            return false;
        if (nome == null) {
            if (other.nome != null)
                return false;
        } else if (!nome.equals(other.nome))
            return false;
        if (crm == null) {
            if (other.crm != null)
                return false;
        } else if (!crm.equals(other.crm))
            return false;
        if (especialidade == null) {
            if (other.especialidade != null)
                return false;
        } else if (!especialidade.equals(other.especialidade))
            return false;
        if (telefone == null) {
            if (other.telefone != null)
                return false;
        } else if (!telefone.equals(other.telefone))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (consultas == null) {
            if (other.consultas != null)
                return false;
        } else if (!consultas.equals(other.consultas))
            return false;
        return true;
    }
}
