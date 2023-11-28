import { useClassNames } from '~/hooks';
import styles from './Search.module.scss';
import Button from '~components/Button';
import { ClearIcon, SearchIcon } from '~assets/icons';
import { useRef, useState } from 'react';

const Search = ({ className: cusClassName }: { className?: string | any; [x: string]: any }) => {
    const cx = useClassNames(styles);

    const [searchValue, setSearchValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearSearch = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };
    const handleChangeValue = (e: any) => {
        const searchValueInput = e.target.value;
        if (!searchValueInput.startsWith(' ')) setSearchValue(searchValueInput);
    };
    return (
        <div className={cx(cusClassName, 'search')}>
            <input
                type="text"
                className={cx('search-input')}
                placeholder="Tìm kiếm..."
                ref={inputRef}
                value={searchValue}
                onChange={handleChangeValue}
            />
            <button type="button" className={cx('clear-btn')} onClick={handleClearSearch}>
                <ClearIcon />
            </button>
            <Button type="submit" btn className={cx('search-btn')}>
                <SearchIcon />
            </Button>
        </div>
    );
};

export default Search;
