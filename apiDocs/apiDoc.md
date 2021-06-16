FORMAT: 1A

# API documentation

# Group Recipes

## Recipes [/api/recipes]

### Create recipe [POST]

+ Request (application/json)

```json
{
  "name": "string",
  "level": "enum(EASY, MEDIUM, HARD)",
  "amountOfIngredientForARecipeList": [
    {
      "ingredient": {
        "name": "string",
        "type": "enum(LIQUID,SOLID)"
      },
      "amount": "double",
      "unit": "string"
    }
    ...
  ],
  "categoryList": [
    {
      "name": "string"
    }
    ...
  ],
  "description": "stirng",
  "preparationTime": "double"
}
```

+ Response 201

### List a recipe [/{id}] [GET]

+ Request (application/json)
    + Path
        + id - the recipe's id
+ Response
    + Body
  
```json
      {
    "id": "string",
    "name": "string",
    "level": "enum(EASY, MEDIUM, HARD)",
    "amountOfIngredientForARecipeList": [
        {
            "id": "string",
            "ingredient": {
                "id": "string",
                "name": "steam",
                "type": "enum(LIQUID,SOLID)"
            },
            "amount": "double",
            "unit": "string"
        }
         ...
    ],
    "categoryList": [
        {
            "id": "string",
            "name": "string"
        }
       ...
    ],
    "description": "stirng",
    "preparationTime": "double"
}

```

### List all recipes [GET]

+ Response
    + Body
  
```json
[
       {
    "id": "string",
    "name": "string",
    "level": "enum(EASY, MEDIUM, HARD)",
    "amountOfIngredientForARecipeList": [
        {
            "id": "string",
            "ingredient": {
                "id": "string",
                "name": "steam",
                "type": "enum(LIQUID,SOLID)"
            },
            "amount": "double",
            "unit": "string"
        }
         ...
    ],
    "categoryList": [
        {
            "id": "string",
            "name": "string"
        }
       ...
    ],
    "description": "stirng",
    "preparationTime": "double"
},
...
]
   ```

### List all types [/types] [GET]

+ Response
    + Body
    ```json
  ["LIQUID","SOLID"]

    ```

### List all levels [/levels] [GET]

+ Response
    + Body
    ```json
  ["EASY","MEDIUM","HARD"]
    ```

# Group Category

## Category [/api/categories]

### List all category [GET]

+ Response
    + Body
      ```json
      [
        {
          "id": "string",
          "name": "string"
        },
        ...
      ]
      ```

# Group Ingredient

## Ingredient [/api/ingredients]

### List all ingredient [GET]

+ Response
    + Body
      ```json
      [
        {
          "id": "string",
          "name": "string"
        },
        ...
      ]
      ```

