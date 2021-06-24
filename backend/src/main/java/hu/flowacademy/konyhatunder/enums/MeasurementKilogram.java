package hu.flowacademy.konyhatunder.enums;

public enum MeasurementKilogram {
    G("gramm"),DKG("dekagramm"),KG("kilogramm");

    private final String hungarianTranslation;

    private MeasurementKilogram(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }

}
