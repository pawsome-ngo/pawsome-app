package in.org.pawsome.pawsome_server.controller;

import in.org.pawsome.pawsome_server.dto.ChatGroupDto;
import in.org.pawsome.pawsome_server.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatGroupController {

    private final ChatService chatService;

    @GetMapping("/groups")
    public ResponseEntity<List<ChatGroupDto>> getUserChatGroups() {
        // We are hardcoding the user ID to 1 for this test.
        // Make sure a user with ID 1 exists and is in a chat group.
        return ResponseEntity.ok(chatService.findChatGroupsByUserId(1L));
    }
}