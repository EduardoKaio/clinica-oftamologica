package com.example.clinicaoftamologica.mapper.custom;

import org.springframework.stereotype.Component;
import com.example.clinicaoftamologica.data.dto.ConsultaDTO;
import com.example.clinicaoftamologica.data.dto.MedicoDTO;
import com.example.clinicaoftamologica.data.dto.PacienteDTO;
import com.example.clinicaoftamologica.mapper.DozerMapper;
import com.example.clinicaoftamologica.model.Consulta;
import com.example.clinicaoftamologica.model.Medico;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ConsultaMapper {

    public ConsultaDTO convertEntityToDto(Consulta consulta) {
        // Criar os DTOs de Medico e Paciente
        MedicoDTO medicoDTO = new MedicoDTO();
        PacienteDTO pacienteDTO = new PacienteDTO();

        // Preencher os dados do MedicoDTO
        if (consulta.getMedico() != null) {
            medicoDTO.setId(consulta.getMedico().getId());
            medicoDTO.setNome(consulta.getMedico().getNome());
            medicoDTO.setCrm(consulta.getMedico().getCrm());
            medicoDTO.setEspecialidade(consulta.getMedico().getEspecialidade());
            medicoDTO.setTelefone(consulta.getMedico().getTelefone());
            medicoDTO.setEmail(consulta.getMedico().getEmail());
        }

        // Preencher os dados do PacienteDTO
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

        // Criar e preencher o ConsultaDTO com os dados dos médicos, pacientes, e outros campos
        return new ConsultaDTO(
            consulta.getId(),
            medicoDTO, // Passando o objeto MedicoDTO completo
            pacienteDTO, // Passando o objeto PacienteDTO completo
            consulta.getDataHora(),
            consulta.getObservacoes()
        );
    }
    public Consulta convertDtoToEntity(ConsultaDTO consultaDTO) {
        return DozerMapper.parseObject(consultaDTO, Consulta.class);
    }
}
