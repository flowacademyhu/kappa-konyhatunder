package hu.flowacademy.konyhatunder.enums;

public enum TypePiece {
    PIECE("Darab");

    private final String hungarianTranslation;

    private TypePiece(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
