package hu.flowacademy.konyhatunder.enums;

public enum TypeLiter {
    CL("centiliter"),ML("milliliter"),DL("deciliter"),L("liter");

    private final String hungarianTranslation;

    private TypeLiter(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
