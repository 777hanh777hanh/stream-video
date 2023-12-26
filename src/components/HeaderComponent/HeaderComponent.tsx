import { Link, useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';

import { useClassNames } from '~/hooks';
import images from '~/assets/images';
import styles from './HeaderComponent.module.scss';
import MenuComponent from '~components/MenuComponent';
import Button from '~components/Button';
import { SearchComponent } from '~components/Search';
import HeaderUserComponent from './HeaderUserComponent';

const HeaderComponent = ({ className: customClassName }: { className: string }, ref: any) => {
    const cx = useClassNames(styles);
    const navigate = useNavigate();

    const user = {
        isSigningIn: true,
    };

    const handleNavigateToLogin = () => {
        navigate('/signin');
    };

    return (
        <header className={cx('header', customClassName)} ref={ref}>
            <Link to="/" className={cx('logo')}>
                <img className={'logo-img'} src={images.logo} alt="777hanh-logo" srcSet={images.logo} />
            </Link>
            <div className={cx('content')}>
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

export default forwardRef(HeaderComponent);
