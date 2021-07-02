package hu.flowacademy.konyhatunder.enums;

public enum MeasurementQuantity {
    G("gramm"),DKG("dekagramm"),KG("kilogramm");

    private final String hungarianTranslation;

    private MeasurementQuantity(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }

}
