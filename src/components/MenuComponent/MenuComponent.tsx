import { useClassNames } from '~/hooks';
import styles from './MenuComponent.module.scss';
import MenuItemComponent from './MenuItemComponent';

const MenuComponent = ({ className: customClassName }: { className: string; collapse?: boolean }) => {
    const cx = useClassNames(styles);

    const classes = cx('navbar', {
        [customClassName]: customClassName,
    });

    const menuData = [
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

    return (
        <>
            <div className={classes}>
                <ul className={cx('navbar-nav')}>
                    {menuData.map((item, index) => (
                        <MenuItemComponent key={index} data={item} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MenuComponent;
