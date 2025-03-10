package com.example.clinicaoftamologica.mapper.custom;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.example.clinicaoftamologica.data.dto.MedicoDTO;
import com.example.clinicaoftamologica.model.Medico;
import com.example.clinicaoftamologica.mapper.DozerMapper;

@Component
public class MedicoMapper {

    public MedicoDTO convertEntityToDto(Medico medico) {
        MedicoDTO medicoDTO = DozerMapper.parseObject(medico, MedicoDTO.class);

        // Verificando se o médico tem consultas associadas e extraindo os IDs
        if (medico.getConsultas() != null && !medico.getConsultas().isEmpty()) {
            List<Long> consultasIds = medico.getConsultas().stream()
                .map(consulta -> consulta.getId()) // Extraindo o ID da consulta
                .collect(Collectors.toList()); // Coletando os IDs em uma lista
            medicoDTO.setConsultasIds(consultasIds); // Atribuindo ao DTO
        }

        return medicoDTO;
    }

    public Medico convertDtoToEntity(MedicoDTO medicoDTO) {
        return DozerMapper.parseObject(medicoDTO, Medico.class);
    }
}
