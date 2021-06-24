package hu.flowacademy.konyhatunder.enums;

public enum MeasurementPiece {
    PIECE("Darab");

    private final String hungarianTranslation;

    private MeasurementPiece(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
