package in.org.pawsome.pawsome_server.service;

import in.org.pawsome.pawsome_server.dto.ChatMessage;
import in.org.pawsome.pawsome_server.dto.ChatGroupDto;
import in.org.pawsome.pawsome_server.entity.ChatGroup;
import in.org.pawsome.pawsome_server.entity.Message;
import in.org.pawsome.pawsome_server.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final MessageRepository messageRepository;
    private final CredentialRepository credentialRepository;
    private final ChatGroupRepository chatGroupRepository;
    private final TeamMemberRepository teamMemberRepository;

    public Message saveMessage(ChatMessage chatMessage, Long groupId) {
        var credential = credentialRepository.findByUsername(chatMessage.getSender())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        var chatGroup = chatGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Chat group not found"));

        Message message = new Message();
        message.setSender(credential.getUser());
        message.setChatGroup(chatGroup);
        message.setMessageContent(chatMessage.getContent());

        return messageRepository.save(message);
    }

    public List<ChatGroupDto> findChatGroupsByUserId(Long userId) {
        var teamMemberships = teamMemberRepository.findByUserId(userId);

        return teamMemberships.stream()
                .map(teamMember -> {
                    ChatGroup chatGroup = chatGroupRepository.findByTeam(teamMember.getTeam())
                            .orElse(null);
                    if (chatGroup != null) {
                        return new ChatGroupDto(chatGroup.getId(), chatGroup.getGroupName());
                    }
                    return null;
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }
}
