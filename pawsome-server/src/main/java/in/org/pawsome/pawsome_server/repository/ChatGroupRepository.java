package in.org.pawsome.pawsome_server.repository;

import in.org.pawsome.pawsome_server.entity.ChatGroup;
import in.org.pawsome.pawsome_server.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatGroupRepository extends JpaRepository<ChatGroup, Long> {
    Optional<ChatGroup> findByTeam(Team team);
}