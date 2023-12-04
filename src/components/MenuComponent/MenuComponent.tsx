import { useClassNames } from '~/hooks';
import styles from './MenuComponent.module.scss';
import MenuItemComponent from './MenuItemComponent';
import { menu } from '~/utils';

const MenuComponent = ({ className: customClassName }: { className: string; collapse?: boolean }) => {
    const cx = useClassNames(styles);

    const classes = cx('navbar', {
        [customClassName]: customClassName,
    });

    const menuData = menu;

    const newMenu: any = [];
    const renderMenu = (menu: any) => {
        menu.forEach((item: any) => {
            if (!item.children) {
                newMenu.push(item);
            } else {
                renderMenu(item.children);
            }
            return newMenu;
        });
    };
    renderMenu([...menuData]);

    return (
        <>
            <div className={classes}>
                <ul className={cx('navbar-nav')}>
                    {menuData.map((item, index) => (
                        <MenuItemComponent key={index} data={item} />
                    ))}
                </ul>
                <ul className={cx('navbar-nav', 'navbar-nav-mobile')}>
                    {newMenu.map((item: any, index: any) => (
                        <MenuItemComponent key={index} data={item} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MenuComponent;
