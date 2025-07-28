package in.org.pawsome.pawsome_server.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_groups")
@Data
public class ChatGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "team_id", unique = true, nullable = false)
    private Team team;

    private String groupName;

    private LocalDateTime createdAt = LocalDateTime.now();
}