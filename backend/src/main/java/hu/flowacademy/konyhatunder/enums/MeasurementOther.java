package hu.flowacademy.konyhatunder.enums;

public enum MeasurementOther {
    PINCH("Csipet"), PACKAGE("Csomag");

    private final String hungarianTranslation;

    private MeasurementOther(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
