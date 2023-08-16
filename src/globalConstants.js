export const HOST = REACT_APP_HOST

export const ROUTES = {
    main: '/',
    admin: '/admin',
    admin_auth: '/admin-auth',
    admin_events: '/admin/events',
    admin_organizers: '/admin/organizers',
    admin_forum_programme: '/admin/forum-programme',
    admin_create: '/create'
}

export const LIST_TYPES = {
    events: 0,
    forum_programme: 1,
    gallery_items: 2
}

export const HEADERS = {
    events: 'Мероприятия',
    forum_programme: 'Программа форума',
    moderators: 'Модераторы',
    speakers: 'Спикеры',
    number: '№',
    report_name: 'Наименование доклада',
    time: 'Время',
    main_speakers: 'Ключевые спикеры',
    news: 'Новости',
    gallery: 'Фотогалерея',
    organizers: 'Организационный комитет'
}

export const ACTIVE_PANELS = {
    forum_programme: 0,
    organizers: 1,
    events: 2
}

export const PANEL_TOOLS = {
    create: {
        id: 2,
        caption: 'Создать',
        icon_class: 'plus',
        route: ROUTES.admin_create
    },
    create_nested: {
        id: 5,
        caption: 'Добавить',
        icon_class: 'plus',
        route: null
    },
    mark_delete: {
        id: 3,
        caption: 'Пометить на удаление',
        icon_class: 'trash-can-list',
        route: null
    },
    delete: {
        id: 4,
        caption: 'Удалить',
        icon_class: 'trash',
        route: null
    },
    back: {
        id: 1,
        caption: 'Назад',
        icon_class: 'arrow-left',
        route: undefined
    }
}

export const ADMIN_MENU = [
    {
        id: 1,
        caption: 'Программа форума',
        icon_class: 'calendar-days',
        panel: ACTIVE_PANELS.forum_programme,
        route: ROUTES.admin_forum_programme
    },
    {
        id: 2,
        caption: 'Организационный комитет',
        icon_class: 'people-pants-simple',
        panel: ACTIVE_PANELS.organizers,
        route: ROUTES.admin_organizers
    },
    {
        id: 3,
        caption: 'Мероприятия',
        icon_class: 'calendar-star',
        panel: ACTIVE_PANELS.events,
        route: ROUTES.admin_events
    }
]

export const HINTS = {
    DRAG_AND_DROP: 'В этом списке можно изменять порядок записей, удерживая левую клавишу мыши и перетаскивая записи'
}