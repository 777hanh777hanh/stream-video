import { BookmarkIcon, LogoutIcon, ProfileIcon } from '~assets/icons';

const menu = [
    {
        content: 'Home',
        to: '/',
        exact: 'exact',
    },
    {
        content: 'Movies',
        to: '/movies',
    },
    {
        content: 'Coming soon',
        to: '/coming-soon',
    },
    {
        content: 'Features',
        children: [
            { content: 'tags', to: '/tags' },
            { content: 'studios', to: '/studios' },
            { content: 'series', to: '/series' },
            { content: 'uncensored', to: '/uncensored' },
        ],
    },
];

const menuAccount = [
    {
        content: 'Thông tin',
        to: '/info',
        link: true,
        icon: <ProfileIcon />,
    },
    {
        content: 'Thư viện',
        to: '/my-list',
        link: true,
        icon: <BookmarkIcon />,
    },
    {
        icon: <LogoutIcon />,
        separate: true,
        content: 'Đăng xuất',
        link: true,
        onClick: () => {
            alert('Đăng xuất');
        },
    },
];

export { menu, menuAccount };
