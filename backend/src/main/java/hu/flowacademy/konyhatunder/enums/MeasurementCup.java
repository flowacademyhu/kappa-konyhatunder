package hu.flowacademy.konyhatunder.enums;

public enum MeasurementCup {
    CUP("Bögre");

    private final String hungarianTranslation;

    private MeasurementCup(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
