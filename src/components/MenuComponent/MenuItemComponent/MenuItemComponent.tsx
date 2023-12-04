import { Fragment, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react/headless';

import { useClassNames } from '~/hooks';
import styles from './MenuItemComponent.module.scss';
import Button from '~components/Button';
import { Wrapper as ProperWrapper } from '~/components/Proper';

const MenuItemComponent = ({ data, ...props }: any) => {
    const cx = useClassNames(styles);

    const subRef: any = useRef();

    const { icon, content, children, ...dataProps } = data;
    const passProps = {
        ...dataProps,
        ...props,
    };

    const renderItem = (children: any) => {
        return children.map((item: any, index: number) => (
            <MenuItemComponent key={index} defaultType data={item} />
        ));
    };

    let Comp: any = Fragment;
    const compProps: any = {};
    if (children) {
        compProps.interactive = true;
        Comp = Tippy;
        compProps.ref = subRef;
        compProps.maxWidth = '100%';
        compProps.zIndex = 5;
        compProps.hideOnClick = true;
        compProps.arrow = false;
        compProps.placement = 'bottom-start';
        compProps.delay = [0, 700];
        compProps.offset = [0, 0];
        compProps.render = (attrs: any) => (
            <div className={cx('menu-sub-item')} tabIndex={-1} {...attrs}>
                <ProperWrapper>{renderItem(children)}</ProperWrapper>
            </div>
        );
    }

    useEffect(() => {
        if (children && subRef && subRef?.current) {
            subRef.current?.setAttribute('width', '100%');
        }
    });

    return (
        <Comp {...compProps}>
            <Button className={cx('menu-item')} navlink link icon={icon} {...passProps}>
                {content}
            </Button>
        </Comp>
    );
};

export default MenuItemComponent;
