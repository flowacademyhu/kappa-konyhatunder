package hu.flowacademy.konyhatunder.controller;
import hu.flowacademy.konyhatunder.model.Image;
import hu.flowacademy.konyhatunder.service.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);


    private final ImageStorageService imageStorageService;

    @PostMapping("/uploadMultipleFiles")
    public List<Image> uploadMultipleFiles(@RequestParam("image") MultipartFile[] files) {
        return Arrays.stream(files)
                .map(imageStorageService::storeFile)
                .collect(Collectors.toList());
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String id) {
        logger.info(id);
        Image image = imageStorageService.getFile(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getFileName() + "\"")
                .body(new ByteArrayResource(image.getData()));
    }

}