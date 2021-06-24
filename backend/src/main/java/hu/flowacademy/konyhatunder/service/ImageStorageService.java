package hu.flowacademy.konyhatunder.service;

import hu.flowacademy.konyhatunder.exception.FileStorageException;
import hu.flowacademy.konyhatunder.exception.MyFileNotFoundException;
import hu.flowacademy.konyhatunder.model.Image;
import hu.flowacademy.konyhatunder.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ImageStorageService {

    private final ImageRepository imageRepository;

    public Image storeFile(MultipartFile file) {

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Érvénytelen fájl név " + fileName);
            }

            Image image = new Image(fileName, file.getContentType(), file.getBytes());

            return imageRepository.save(image);
        } catch (IOException ex) {
            throw new FileStorageException("Nem sikerült a feltöltés" + fileName + ". Próbáld meg újra!", ex);
        }
    }

    public Image getFile(String fileName) {
        return imageRepository.findByFileName(fileName)
                .orElseThrow(() -> new MyFileNotFoundException("Nincs ilyen nevű kép " + fileName));
    }
}