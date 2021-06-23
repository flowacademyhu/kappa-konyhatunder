package hu.flowacademy.konyhatunder.enums;

public enum TypeKilogramm {
    G("gramm"),DKG("dekagramm"),KG("kilogramm");

    private final String hungarianTranslation;

    private TypeKilogramm(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }

}
