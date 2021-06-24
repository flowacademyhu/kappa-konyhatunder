package hu.flowacademy.konyhatunder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@ResponseBody
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ValidationException.class)
    public List<String> handleValidationException(
            ValidationException validationException
    ) {
        return List.of(validationException.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(FileStorageException.class)
    public List<String> handleFileStorageException(
            FileStorageException fileStorageException
    ) {
        return List.of(fileStorageException.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(MyFileNotFoundException.class)
    public List<String> handleMyFileNotFoundException(
            MyFileNotFoundException myFileNotFoundException
    ) {
        return List.of(myFileNotFoundException.getMessage());
    }


    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(MissingIDException.class)
    public List<String> handleMissingIDException(
            MissingIDException missingIDException
    ) {
        return List.of(missingIDException.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Throwable.class)
    public List<String> handleEverything(
            Throwable throwable) {
        return List.of(throwable.getMessage());
    }
}
