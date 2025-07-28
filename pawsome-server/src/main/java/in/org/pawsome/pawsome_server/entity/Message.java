package in.org.pawsome.pawsome_server.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_group_id", nullable = false)
    private ChatGroup chatGroup;

    @ManyToOne
    @JoinColumn(name = "sender_id") // Can be null if user is deleted
    private User sender;

    @Column(columnDefinition = "TEXT")
    private String messageContent;

    @ManyToOne
    @JoinColumn(name = "replied_to_message_id")
    private Message repliedToMessage;

    private LocalDateTime sentAt = LocalDateTime.now();
}
