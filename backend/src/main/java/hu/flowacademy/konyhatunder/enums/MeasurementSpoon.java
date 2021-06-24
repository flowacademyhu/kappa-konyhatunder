package hu.flowacademy.konyhatunder.enums;

public enum MeasurementSpoon {
    TABLE_SPOON("Evőkanál"), TEA_SPOON("Teáskanál"), COFFEE_SPOON("Kávéskanál");

    private final String hungarianTranslation;

    private MeasurementSpoon(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
