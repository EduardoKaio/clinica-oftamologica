package com.example.clinicaoftamologica.mapper.custom;

import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.data.vo.PacienteVO;
import com.example.clinicaoftamologica.model.Paciente;

@Service
public class PacienteMapper {
    public PacienteVO convertEntityToVo(Paciente paciente) {
		PacienteVO vo = new PacienteVO();
		
		vo.setId(paciente.getId());
        vo.setNome(paciente.getNome());
        vo.setDataDeNascimento(paciente.getDataDeNascimento());
        vo.setCpf(paciente.getEndereco());
        vo.setEndereco(paciente.getEndereco());
        vo.setGenero(paciente.getGenero());
        vo.setCelular(paciente.getCelular());
        vo.setHistoricoMedico(paciente.getHistoricoMedico());
		
		return vo;
	}
	
	public Paciente convertVoToEntity(PacienteVO paciente) {
		Paciente entity = new Paciente();
		
		entity.setId(paciente.getId());
        entity.setNome(paciente.getNome());
        entity.setDataDeNascimento(paciente.getDataDeNascimento());
        entity.setCpf(paciente.getEndereco());
        entity.setEndereco(paciente.getEndereco());
        entity.setGenero(paciente.getGenero());
        entity.setCelular(paciente.getCelular());
        entity.setHistoricoMedico(paciente.getHistoricoMedico());
		
		return entity;
	}
}
