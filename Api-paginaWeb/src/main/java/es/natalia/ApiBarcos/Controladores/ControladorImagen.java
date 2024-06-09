package es.natalia.ApiBarcos.Controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import es.natalia.ApiBarcos.Modelos.Image;
import es.natalia.ApiBarcos.Servicios.ImageService;

@CrossOrigin(origins = "Http://localhost:4200")
@RestController
@RequestMapping("/api/v1/images")
public class ControladorImagen {
    private final ImageService imageService;

     @Autowired
    public ControladorImagen(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<Image>> index() {
        return new ResponseEntity<>(imageService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Image> store(@RequestParam("image") MultipartFile file, @RequestParam("title") String title) {
        try {
            Image image = imageService.save(file, title);
            return new ResponseEntity<>(image, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> show(@PathVariable Long id) {
        return imageService.findById(id)
                .map(image -> new ResponseEntity<>(image, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> destroy(@PathVariable Long id) {
        try {
            imageService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
