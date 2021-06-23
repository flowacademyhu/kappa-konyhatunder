package hu.flowacademy.konyhatunder.enums;

public enum TypeOther {
    PINCH("Csipet"), PACKAGE("Csomag");

    private final String hungarianTranslate;

    private TypeOther(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslate;
    }
}
