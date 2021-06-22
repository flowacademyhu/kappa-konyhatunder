package hu.flowacademy.konyhatunder.enums;

public enum TypePiece {
    PIECE("Darab");

    private final String hungarianTranslate;

    private TypePiece(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslate(){
        return hungarianTranslate;
    }
}
