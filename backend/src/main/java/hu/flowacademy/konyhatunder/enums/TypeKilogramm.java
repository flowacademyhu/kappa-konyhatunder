package hu.flowacademy.konyhatunder.enums;

public enum TypeKilogramm {
    G("gramm"),DKG("dekagramm"),KG("kilogramm");

    private final String hungarianTranslate;

    private TypeKilogramm(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslate(){
        return hungarianTranslate;
    }

}
