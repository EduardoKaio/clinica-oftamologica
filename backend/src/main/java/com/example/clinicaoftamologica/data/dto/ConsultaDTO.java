package com.example.clinicaoftamologica.data.dto;

import java.time.LocalDateTime;

import org.springframework.hateoas.RepresentationModel;

public class ConsultaDTO extends RepresentationModel<ConsultaDTO> {
    

    private Long id;
    private MedicoDTO medico;
    private PacienteDTO paciente;
    private LocalDateTime dataHora;
    private String observacoes;

    public ConsultaDTO() {}
    

    public ConsultaDTO(Long id, MedicoDTO medico, PacienteDTO paciente, LocalDateTime dataHora, String observacoes) {
        this.id = id;
        this.medico = medico;
        this.paciente = paciente;
        this.dataHora = dataHora;
        this.observacoes = observacoes;
    }


    public Long getId() {
        return id;
    }

    public MedicoDTO getMedico() {
        return medico;
    }

    public void setMedico(MedicoDTO medico) {
        this.medico = medico;
    }

    public PacienteDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(PacienteDTO paciente) {
        this.paciente = paciente;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
