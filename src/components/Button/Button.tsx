import { useClassNames } from '~/hooks';
import styles from './Button.module.scss';
import { NavLink, Link } from 'react-router-dom';
import React from 'react';

const Button = (
    {
        to,
        href,
        onClick,
        children,
        className: cusClassName,
        icon,
        link,
        btn,
        navlink,
        disabled,
        defaultType,
        ...passProps
    }: any,
    ref: any,
) => {
    const cx = useClassNames(styles);

    const classes = cx('wrapper', {
        btn,
        link,
        disabled,
        default: defaultType,
        [cusClassName]: cusClassName,
    });

    const props: {
        to?: string;
        href?: string;
        disabled?: boolean;
        onClick?: () => void;
        ref: any;
        className?: string | undefined | any;
    } = {
        to,
        href,
        onClick,
        className: classes,
        disabled,
        ref,
        ...passProps,
    };

    let Comp: any = 'button';

    if (to) {
        props.to = to;
        Comp = Link;
        if (navlink) {
            Comp = NavLink;
            props.className = ({ isActive }) => {
                return cx(classes, { active: isActive });
            };
        }
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key];
        });
    }

    return (
        <Comp {...props} ref={ref}>
            {icon && <div className={cx('icon')}>{icon}</div>}
            {children}
        </Comp>
    );
};

export default React.forwardRef(Button);
