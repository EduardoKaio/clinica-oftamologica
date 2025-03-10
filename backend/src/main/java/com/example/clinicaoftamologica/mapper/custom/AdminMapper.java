package com.example.clinicaoftamologica.mapper.custom;

import org.springframework.stereotype.Service;

import com.example.clinicaoftamologica.data.vo.AdminVO;
import com.example.clinicaoftamologica.model.Admin;
import com.example.clinicaoftamologica.mapper.DozerMapper;

public class AdminMapper {

    public AdminVO convertEntityToVo(Admin admin) {
        return DozerMapper.parseObject(admin, AdminVO.class);
    }
    
    public Admin convertVoToEntity(AdminVO adminVO) {
        return DozerMapper.parseObject(adminVO, Admin.class);
    }
}
