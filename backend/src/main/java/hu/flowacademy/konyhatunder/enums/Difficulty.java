package hu.flowacademy.konyhatunder.enums;

public enum Difficulty {
    EASY("Könnyű"), MEDIUM("Közepes"), HARD("Nehéz");

    private final String hungarianTranslation;

    private Difficulty(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}

