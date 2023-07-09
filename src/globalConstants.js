export const ROUTES = {
    main: '/',
    admin: '/admin',
    admin_auth: 'admin-auth/'
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
    view: {
        id: 1,
        caption: 'Представление',
        icon_class: 'bars'
    },
    create: {
        id: 2,
        caption: 'Создать',
        icon_class: 'plus'
    },
    delete: {
        id: 3,
        caption: 'Пометить на удаление',
        icon_class: 'trash-can-list'
    }
}

export const ADMIN_MENU = [
    {
        id: 1,
        caption: 'Программа форума',
        icon_class: 'calendar-days',
        panel: ACTIVE_PANELS.forum_programme
    },
    {
        id: 2,
        caption: 'Организационный комитет',
        icon_class: 'people-pants-simple',
        panel: ACTIVE_PANELS.organizers
    },
    {
        id: 3,
        caption: 'Мероприятия',
        icon_class: 'calendar-star',
        panel: ACTIVE_PANELS.events
    }
]