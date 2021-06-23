package hu.flowacademy.konyhatunder.enums;

public enum TypeOther {
    PINCH("Csipet"), PACKAGE("Csomag");

    private final String hungarianTranslation;

    private TypeOther(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
