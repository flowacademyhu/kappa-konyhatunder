package hu.flowacademy.konyhatunder.enums;

public enum TypeLiter {
    CL("centiliter"),ML("milliliter"),DL("deciliter"),L("liter");

    private final String hungarianTranslate;

    private TypeLiter(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslate(){
        return hungarianTranslate;
    }
}
