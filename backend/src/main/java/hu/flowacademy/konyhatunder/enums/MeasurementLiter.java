package hu.flowacademy.konyhatunder.enums;

public enum MeasurementLiter {
    CL("centiliter"),ML("milliliter"),DL("deciliter"),L("liter");

    private final String hungarianTranslation;

    private MeasurementLiter(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
