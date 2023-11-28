import { Link } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import images from '~/assets/images';
import MenuComponent from '~components/MenuComponent';
import Button from '~components/Button';
import styles from './HeaderComponent.module.scss';
import { SearchComponent } from '../Search';

const HeaderComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    return (
        <header className={cx('header', customClassName)}>
            <div className={cx('side')}>
                <Link to="/" className={cx('logo')}>
                    <img className={'logo-img'} src={images.logo} alt="777hanh-logo" srcSet={images.logo} />
                </Link>
                <MenuComponent className={cx('menu')} />
            </div>
            <SearchComponent />
            <div className={cx('cta')}>
                <Button btn className={cx('login')}>
                    Đăng nhập
                </Button>
            </div>
        </header>
    );
};

export default HeaderComponent;
