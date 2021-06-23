package hu.flowacademy.konyhatunder.enums;

public enum TypeSpoon {
    TABLE_SPOON("Evőkanál"), TEA_SPOON("Teáskanál"), COFFEE_SPOON("Kávéskanál");

    private final String hungarianTranslation;

    private TypeSpoon(String value){
        hungarianTranslation = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslation;
    }
}
