package es.natalia.ApiBarcos.Servicios;

import es.natalia.ApiBarcos.Modelos.Image;
import es.natalia.ApiBarcos.Repositorios.RepositorioImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    private final RepositorioImage imageRepository;
    private final Path rootLocation = Paths.get("images");

    @Autowired
    public ImageService(RepositorioImage imageRepository) {
        this.imageRepository = imageRepository;
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!", e);
        }
    }

    public List<Image> findAll() {
        return imageRepository.findAll();
    }

    public Optional<Image> findById(Long id) {
        return imageRepository.findById(id);
    }

    public Image save(MultipartFile file, String title) throws IOException {
        String filename = file.getOriginalFilename();
        Files.copy(file.getInputStream(), this.rootLocation.resolve(filename));
        Image image = new Image();
        image.setTitle(title);
        image.setPath(this.rootLocation.resolve(filename).toString());
        return imageRepository.save(image);
    }

    public void deleteById(Long id) throws IOException {
        Optional<Image> image = imageRepository.findById(id);
        if (image.isPresent()) {
            Files.deleteIfExists(Paths.get(image.get().getPath()));
            imageRepository.deleteById(id);
        }
    }
}