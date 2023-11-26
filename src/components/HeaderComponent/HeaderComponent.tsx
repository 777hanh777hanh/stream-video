import { useClassNames } from '~/hooks';
import styles from './HeaderComponent.module.scss';
import images from '~/assets/images';
import MenuComponent from '../MenuComponent';
import { Link } from 'react-router-dom';

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
        </header>
    );
};

export default HeaderComponent;
