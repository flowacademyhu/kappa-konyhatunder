package hu.flowacademy.konyhatunder.enums;

public enum TypeSpoon {
    TABLE_SPOON("Evőkanál"), TEA_SPOON("Teáskanál"), COFFEE_SPOON("Kávéskanál");

    private final String hungarianTranslate;

    private TypeSpoon(String value){
        hungarianTranslate = value;
    }

    public String getHungarianTranslation(){
        return hungarianTranslate;
    }
}
