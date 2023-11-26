import { useClassNames } from '~/hooks';
import styles from './Button.module.scss';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type ButtonType = {
    to?: string;
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    primary?: boolean;
    outline?: boolean;
    rounded?: boolean;
    small?: boolean;
    large?: boolean;
    disabled?: boolean;
    activeclassname?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
};

const Button = ({
    to,
    href,
    onClick,
    children,
    className: cusClassName = '',
    icon,
    activeclassname = '',
    ...passProps
}: ButtonType) => {
    const cx = useClassNames(styles);

    const classes = ({ isActive }: { isActive: boolean }) =>
        cx('wrapper', {
            [cusClassName]: cusClassName,
            active: isActive ? 'active' : '',
        });

    const props: {
        onClick?: () => void;
        to?: string;
        href?: string;
        activeclassname?: string;
    } = {
        onClick,
        ...passProps,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Comp: any = 'button';
    if (to) {
        props.to = to;
        props.activeclassname = activeclassname;
        Comp = NavLink;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={({ isActive }: { isActive: boolean }) => classes({ isActive })} {...props}>
            <div className={cx('icon')}>{icon}</div>
            {children}
        </Comp>
    );
};

export default Button;
