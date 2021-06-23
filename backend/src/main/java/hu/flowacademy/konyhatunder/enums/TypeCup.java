package hu.flowacademy.konyhatunder.enums;

public enum TypeCup {
    CUP("Bögre");

    private final String hungarianTranslate;

    private TypeCup(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslate;
    }
}
