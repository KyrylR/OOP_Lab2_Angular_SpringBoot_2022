package ua.univ.autobase_backend.messages;

import lombok.AllArgsConstructor;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.binding.BinderAwareChannelResolver;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import ua.univ.autobase_backend.dto.Payload;
import ua.univ.autobase_backend.dto.RegistrationDto;
import ua.univ.autobase_backend.exceptions.MessageException;

import java.util.HashMap;
import java.util.Map;

@Component
@AllArgsConstructor
@EnableBinding
public class KeycloakMessageService {

    private BinderAwareChannelResolver resolver;


    @EventListener
    public void publishObject(RegistrationDto registrationDto){
        publish(registrationDto);
    }

    private void publish(RegistrationDto registrationDto){
        Payload payload = new Payload();
        payload.setRegistrationDto(registrationDto);
        payload.setEvent("CREATE");

        Map<String, String> headers = new HashMap<>();
        headers.put("EventVersion", "v1");
        headers.put("EntityVersion", "v1");

        Message<Payload> message = MessageBuilder
                .withPayload(payload)
                .copyHeaders(headers)
                .build();

        MessageChannel channel = resolver.resolveDestination("registration-event-output");

        if(!channel.send(message)){
            throw new MessageException("Message can not send to keycloak");
        }

    }
}
