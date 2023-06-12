import React, {useCallback, useState} from "react"

import WrapButton from "../components/content/wrap-button/WrapButton"

//Хук используется для формирования сворачиваемых вкладок
//Суть проста:
// 1. Сначала создаем переменную isWrapped и отслеживаем её состояние через встроенный хук useState
// 2. Создаем компонент, который будет выполнять роль сворачивания/разворачивания содержимого
// 3. Создаем функцию, которая будет возвращать актуальное состояние isWrapped, и оборачиваем её в
// встроенный хук useCallback, чтобы функция обновлялась в зависимости от изменения isWrapped
// (иначе будем получать одно и то же состояние, а именно дефолтное, то есть true)
// 4. Возвращаем callback и компонент переключатель компоненту-потребителю

// Отмечу, что компонент переключатель содержит в себе ссылку на callback для смены состояния isWrapped
// Таким образом мы изменяем состояние извне без интеграций с Redux (тут он просто избыточен)

export default function useWrap(wrapHeader) {
    const [isWrapped, setIsWrapped] = useState(true) //дефолтное состояние

    //Если у вас редактор кода будет ругаться на set_is_wrapped, что он не используется
    //Hе верьте ему, все работает, все используется. Видимо редактор кода баг выдает (с JS бывает такое)
    const wrap = <WrapButton wrap_button_props={{
        header_text: wrapHeader,
        set_is_wrapped: (newValue) => setIsWrapped(newValue)
    }} />
    const getState = useCallback(() => {
        return isWrapped
    }, [isWrapped])

    return [getState, wrap]
}