package hu.flowacademy.konyhatunder.enums;

public enum Level {
    EASY("Könnyű"), MEDIUM("Közepes"), HARD("Nehéz");

    private final String hungarianTranslation;

    private Level(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}

