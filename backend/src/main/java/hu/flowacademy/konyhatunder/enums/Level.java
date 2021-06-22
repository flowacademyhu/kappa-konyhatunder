package hu.flowacademy.konyhatunder.enums;

public enum Level {
    EASY("Könnyű"), MEDIUM("Közepes"), HARD("Nehéz");

    private final String hungarianTranslate;

    private Level(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslate(){
        return hungarianTranslate;
    }
}
