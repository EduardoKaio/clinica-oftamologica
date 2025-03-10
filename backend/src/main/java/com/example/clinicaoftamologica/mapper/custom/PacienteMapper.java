package com.example.clinicaoftamologica.mapper.custom;

import java.util.List;
import java.util.stream.Collectors;

import com.example.clinicaoftamologica.data.dto.PacienteDTO;
import com.example.clinicaoftamologica.model.Paciente;
import com.example.clinicaoftamologica.mapper.DozerMapper;

public class PacienteMapper {

    public static PacienteDTO convertEntityToDTO(Paciente paciente) {
        PacienteDTO dto = DozerMapper.parseObject(paciente, PacienteDTO.class);

        // Evita LazyInitializationException ao acessar consultas
        if (paciente.getConsultas() != null && !paciente.getConsultas().isEmpty()) {
            List<Long> consultasIds = paciente.getConsultas().stream()
                .map(consulta -> consulta.getId()) // Pegando apenas os IDs das consultas
                .collect(Collectors.toList()); 

            dto.setConsultasIds(consultasIds); 
        }

        return dto;
    }

    public static Paciente convertDTOToEntity(PacienteDTO pacienteDTO) {
        return DozerMapper.parseObject(pacienteDTO, Paciente.class);
    }
}
