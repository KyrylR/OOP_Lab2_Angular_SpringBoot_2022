package ua.univ.autobase_backend.services;

import org.springframework.stereotype.Service;
import ua.univ.autobase_backend.convertors.RegistrationConverter;
import ua.univ.autobase_backend.dto.RegistrationDto;
import ua.univ.autobase_backend.entity.RegistrationEntity;
import ua.univ.autobase_backend.repository.RegistrationRepository;

@Service
public class RegistrationControllerService {
    private RegistrationRepository registrationRepository;
    private RegistrationConverter registrationConverter;

    public RegistrationService(RegistrationRepository registrationRepository, RegistrationConverter registrationConverter) {
        this.registrationRepository = registrationRepository;
        this.registrationConverter = registrationConverter;
    }

    public RegistrationDto registeredUser(RegistrationDto registrationDto) {
        final RegistrationEntity entity = registrationConverter.converterToEntity(registrationDto);
        final RegistrationEntity savedEntity = registrationRepository.save(entity);
        final RegistrationDto saveDto = registrationConverter.converterToDto(entity);
        
        return saveDto;
    }
}
