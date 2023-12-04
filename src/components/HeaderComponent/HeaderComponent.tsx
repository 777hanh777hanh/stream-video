import { Link, useNavigate } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import images from '~/assets/images';
import styles from './HeaderComponent.module.scss';
import MenuComponent from '~components/MenuComponent';
import Button from '~components/Button';
import { SearchComponent } from '~components/Search';
import HeaderUserComponent from './HeaderUserComponent';
import { MenuIcon } from '~assets/icons';
import { useState } from 'react';

const HeaderComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    const user = {
        isSigningIn: true,
    };

    const handleNavigateToLogin = () => {
        navigate('/signin');
    };

    const handleToggleShowContent = () => {
        setShowContent(!showContent);
    };

    return (
        <header className={cx('header', customClassName)}>
            <Link to="/" className={cx('logo')}>
                <img className={'logo-img'} src={images.logo} alt="777hanh-logo" srcSet={images.logo} />
            </Link>
            <Button
                className={cx('header-toggle')}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleToggleShowContent}
            >
                <MenuIcon />
            </Button>
            <div className={cx('content', { show: showContent })}>
                <div className={cx('side')}>
                    <MenuComponent className={cx('menu')} />
                    <SearchComponent className={cx('search')} />
                </div>
                <div className={cx('cta')}>
                    {(!user.isSigningIn && (
                        <Button btn className={cx('login')} onClick={handleNavigateToLogin}>
                            Đăng nhập
                        </Button>
                    )) || <HeaderUserComponent className={cx('user')} />}
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;
