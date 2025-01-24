export let ingredients = [
    {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
        id: '0'
    },
    {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
        id: '1'
    },
]

export const errorMessage = 'fail message';

export const message = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "643d69a5c3f7b9001cfa093c",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0942",
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2024-01-13T13:21:37.587Z",
            "updatedAt": "2021-01-13T14:21:37.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
};

export const userRegisterResponse = {
    user: { email: 'dar@yandex.ru', name: 'test' },
    accessToken: 'Bearer accessToken',
    refreshToken: 'refreshToken',
}

export const userLoginResponse = {
    user: { email: 'dar@yandex.ru', name: 'test' },
    accessToken: 'Bearer accessToken',
    refreshToken: 'refreshToken',
    isAuth: true,
}

export const getUserResponse = {
    user: { email: 'dar@yandex.ru', name: 'test' },
    isAuth: true,
}


export const patchUserState = {
    user: { email: 'ivan@yandex.ru', name: 'ivan' }
}
export const patchUserResponse = {
    user: { email: 'dar@yandex.ru', name: 'test' },
}