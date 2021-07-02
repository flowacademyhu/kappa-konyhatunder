package hu.flowacademy.konyhatunder.enums;

public enum MeasurementVolume {
    CL("centiliter"),ML("milliliter"),DL("deciliter"),L("liter");

    private final String hungarianTranslation;

    private MeasurementVolume(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
