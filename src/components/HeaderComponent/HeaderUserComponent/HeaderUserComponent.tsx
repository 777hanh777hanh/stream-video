import TippyHeadless from '@tippyjs/react/headless';

import images from '~assets/images';
import { useClassNames } from '~/hooks';
import styles from './HeaderUserComponent.module.scss';
import Button from '~components/Button';
import { Wrapper as ProperWrapper } from '~components/Proper';
import Image from '~/components/Image';
import { menuAccount } from '~/utils';

const HeaderUserComponent = ({ className, ...data }) => {
    const cx = useClassNames(styles);

    const userMenu = menuAccount;

    const renderMenuUser = (attrs: any) => {
        return (
            <ProperWrapper className={cx('menu-user')} tabIndex={-1} {...attrs}>
                {userMenu.map((item, index) => {
                    return (
                        <Button
                            to={item.to}
                            key={index}
                            onClick={item.onClick || null}
                            link={item.link || false}
                            className={cx('menu-user-item', { separate: item.separate })}
                            icon={item.icon}
                        >
                            {item.content}
                        </Button>
                    );
                })}
            </ProperWrapper>
        );
    };

    return (
        <TippyHeadless
            interactive
            placement="bottom-start"
            offset={[10, 10]}
            delay={[0, 700]}
            hideOnClick={false}
            render={(attrs) => renderMenuUser(attrs)}
        >
            <div className={cx('user', className)}>
                <Image
                    className={cx('user-avatar')}
                    src={images.noImage}
                    alt={data.name || 'user-anonymous'}
                />
            </div>
        </TippyHeadless>
    );
};

export default HeaderUserComponent;
