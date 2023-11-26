import { useClassNames } from '~/hooks';
import styles from './MenuItemComponent.module.scss';
import Button from '~/components/Button';

const MenuItemComponent = ({ data, ...props }: { data: { content: string; [key: string]: unknown } }) => {
    const cx = useClassNames(styles);

    const { icon, content, ...dataProps } = data;
    const passProps = {
        ...dataProps,
        ...props,
    };

    return (
        <Button className={cx('menu-item')} icon={icon} {...passProps}>
            {content}
        </Button>
    );
};

export default MenuItemComponent;
