import { useClassNames } from '~/hooks';
import styles from './Button.module.scss';
import { NavLink } from 'react-router-dom';

const Button: any = ({
    to,
    href,
    onClick,
    children,
    className: cusClassName,
    icon,
    link,
    btn,
    ...passProps
}) => {
    const cx = useClassNames(styles);

    const classes = cx('wrapper', {
        [cusClassName]: cusClassName,
        btn,
        link,
    });

    const props: {
        to?: string;
        href?: string;
        onClick?: () => void;
        className?: string | undefined | any;
    } = {
        to,
        href,
        onClick,
        className: classes,
        ...passProps,
    };

    let Comp: any = 'button';

    if (to) {
        props.to = to;
        Comp = NavLink;
        props.className = ({ isActive }) => {
            return cx(classes, { active: isActive });
        };
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp {...props}>
            {icon && <div className={cx('icon')}>{icon}</div>}
            {children}
        </Comp>
    );
};

export default Button;
