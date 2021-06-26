package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.exception.FileStorageException;
import hu.flowacademy.konyhatunder.exception.MyFileNotFoundException;
import hu.flowacademy.konyhatunder.model.Image;
import hu.flowacademy.konyhatunder.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageStorageService {

    private final ImageRepository imageRepository;

    public Image storeFile(MultipartFile file) {
        if (file == null) {
            log.debug("No image uploaded");
            return imageRepository.findByFileName("abc").orElseThrow(() -> new MyFileNotFoundException("Nincs default image"));
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Érvénytelen fájl név " + fileName);
            }
            Image image = new Image(fileName, file.getContentType(), file.getBytes());
            log.debug("Saved an image");
            return imageRepository.save(image);
        } catch (IOException ex) {
            throw new FileStorageException("Nem sikerült a feltöltés" + fileName + ". Próbáld meg újra!", ex);
        }
    }

    public Image getFile(String id) {
        log.debug("Get an image with this id: {}", id);
        return imageRepository.findById(id)
                .orElseThrow(() -> new MyFileNotFoundException("Nincs ilyen nevű kép " + id));
    }
}