package hu.flowacademy.konyhatunder.enums;

public enum Measurement {
    QUANTITY("Tömeg"), VOLUME("Térfogat"), SPOON("Kanál"), CUP("Bögre"), PIECE("Darab"), OTHER("Egyéb");

    private final String hungarianTranslation;

    private Measurement(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
