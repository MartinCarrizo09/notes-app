package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Tag;
import com.ensolvers.notes.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles CRUD operations for tags.
 */
@Service
public class TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    public Tag createTag(String name) {
        return tagRepository.findByName(name)
                .orElseGet(() -> tagRepository.save(new Tag(null, name, null)));
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
