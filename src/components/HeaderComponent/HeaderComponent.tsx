import { Link, useNavigate } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import images from '~/assets/images';
import styles from './HeaderComponent.module.scss';
import MenuComponent from '~components/MenuComponent';
import Button from '~components/Button';
import { SearchComponent } from '~components/Search';

const HeaderComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/signin');
    };

    return (
        <header className={cx('header', customClassName)}>
            <div className={cx('side')}>
                <Link to="/" className={cx('logo')}>
                    <img className={'logo-img'} src={images.logo} alt="777hanh-logo" srcSet={images.logo} />
                </Link>
                <MenuComponent className={cx('menu')} />
            </div>
            <SearchComponent className={'search'} />
            <div className={cx('cta')}>
                <Button disabled btn className={cx('login')} onClick={handleNavigateToLogin}>
                    Đăng nhập
                </Button>
            </div>
        </header>
    );
};

export default HeaderComponent;
