package in.org.pawsome.pawsome_server.repository;

import in.org.pawsome.pawsome_server.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {}