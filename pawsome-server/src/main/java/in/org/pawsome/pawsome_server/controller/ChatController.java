package in.org.pawsome.pawsome_server.controller;

import in.org.pawsome.pawsome_server.dto.ChatMessage;
import in.org.pawsome.pawsome_server.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/chat/{groupId}/sendMessage")
    public void sendMessage(@DestinationVariable Long groupId, @Payload ChatMessage chatMessage) {
        chatService.saveMessage(chatMessage, groupId);
        messagingTemplate.convertAndSend(String.format("/topic/chat/%s", groupId), chatMessage);
    }

    @MessageMapping("/chat/{groupId}/addUser")
    public void addUser(@DestinationVariable Long groupId, @Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        String username = chatMessage.getSender();
        headerAccessor.getSessionAttributes().put("username", username);
        headerAccessor.getSessionAttributes().put("currentGroupId", groupId);
        messagingTemplate.convertAndSend(String.format("/topic/chat/%s", groupId), chatMessage);
    }
}