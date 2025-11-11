package com.ensolvers.notes.repository;

import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserAndArchivedFalse(User user);
    List<Note> findByUserAndArchivedTrue(User user);
    List<Note> findByUser(User user);
}
