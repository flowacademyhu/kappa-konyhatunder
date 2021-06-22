package hu.flowacademy.konyhatunder.enums;

public enum Type {
    KG("Kilogramm"), LITER("Liter"), SPOON("Kanál"), CUP("Bögre"), PIECE("Darab"), OTHER("Egyéb");

    private final String hungarianTranslate;

    private Type(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslate(){
        return hungarianTranslate;
    }
}
