package com.example.clinicaoftamologica.model;

import java.io.Serializable;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "paciente")
public class Paciente implements Serializable{
    
    private static final long serialVersionUID = 1L;

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "data_de_nascimento", nullable = false)
    private Date dataDeNascimento;

    @Column(name = "cpf", nullable = false, length = 16)
    private String cpf;

    @Column(name = "endereco", length = 100)
    private String endereco;

    @Column(name = "genero", length = 30)
    private String genero;

    @Column(name = "celular",nullable = false, length = 30)
    private String celular;

    @Column(name = "email", nullable = false, length = 80)
    private String email;

    @Column(name = "historico_medico", nullable = false, length = 150)
    private String historicoMedico;
    
    public String getHistoricoMedico() {
        return historicoMedico;
    }

    public void setHistoricoMedico(String historicoMedico) {
        this.historicoMedico = historicoMedico;
    }

    @OneToMany(mappedBy = "paciente",fetch = FetchType.LAZY)
    private List<Consulta> consultas;
    
    public List<Consulta> getConsultas() {
        return consultas;
    }

    public void setConsultas(List<Consulta> consultas) {
        this.consultas = consultas;
    }

    public Paciente() {
    }
    
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((dataDeNascimento == null) ? 0 : dataDeNascimento.hashCode());
        result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
        result = prime * result + ((endereco == null) ? 0 : endereco.hashCode());
        result = prime * result + ((genero == null) ? 0 : genero.hashCode());
        result = prime * result + ((celular == null) ? 0 : celular.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((historicoMedico == null) ? 0 : historicoMedico.hashCode());
        result = prime * result + ((consultas == null) ? 0 : consultas.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Paciente other = (Paciente) obj;
        if (id != other.id)
            return false;
        if (nome == null) {
            if (other.nome != null)
                return false;
        } else if (!nome.equals(other.nome))
            return false;
        if (dataDeNascimento == null) {
            if (other.dataDeNascimento != null)
                return false;
        } else if (!dataDeNascimento.equals(other.dataDeNascimento))
            return false;
        if (cpf == null) {
            if (other.cpf != null)
                return false;
        } else if (!cpf.equals(other.cpf))
            return false;
        if (endereco == null) {
            if (other.endereco != null)
                return false;
        } else if (!endereco.equals(other.endereco))
            return false;
        if (genero == null) {
            if (other.genero != null)
                return false;
        } else if (!genero.equals(other.genero))
            return false;
        if (celular == null) {
            if (other.celular != null)
                return false;
        } else if (!celular.equals(other.celular))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (historicoMedico == null) {
            if (other.historicoMedico != null)
                return false;
        } else if (!historicoMedico.equals(other.historicoMedico))
            return false;
        if (consultas == null) {
            if (other.consultas != null)
                return false;
        } else if (!consultas.equals(other.consultas))
            return false;
        return true;
    }

   

}
