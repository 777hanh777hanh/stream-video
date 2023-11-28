import { Link } from 'react-router-dom';

import { useClassNames } from '~/hooks';
import images from '~/assets/images';
import MenuComponent from '~components/MenuComponent';
import Button from '~components/Button';
import styles from './HeaderComponent.module.scss';

const HeaderComponent = ({ className: customClassName }: { className: string }) => {
    const cx = useClassNames(styles);
    return (
        <header className={cx('header', customClassName)}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img className={'logo-img'} src={images.logo} alt="777hanh-logo" srcSet={images.logo} />
                </Link>
            </div>
            <MenuComponent className={cx('menu')} />
            <div className={cx('cta')}>
                <Button btn>Login</Button>
            </div>
        </header>
    );
};

export default HeaderComponent;
