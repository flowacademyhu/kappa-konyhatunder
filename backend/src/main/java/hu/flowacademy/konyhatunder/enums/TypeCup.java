package hu.flowacademy.konyhatunder.enums;

public enum TypeCup {
    CUP("Bögre");

    private final String hungarianTranslation;

    private TypeCup(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
