package hu.flowacademy.konyhatunder.enums;

public enum Measurement {
    KG("Kilogramm"), LITER("Liter"), SPOON("Kanál"), CUP("Bögre"), PIECE("Darab"), OTHER("Egyéb");

    private final String hungarianTranslation;

    private Measurement(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
