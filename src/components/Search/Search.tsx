import { useRef, useState, forwardRef, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';

import { useClassNames } from '~/hooks';
import styles from './Search.module.scss';
import Button from '~components/Button';
import { ClearIcon, SearchIcon } from '~assets/icons';
import ProperWrapper from '~components/Proper/Wrapper';
import SearchVideoItem from './SearchVideoItem';

const Search = ({ className: cusClassName }, ref: any) => {
    const cx = useClassNames(styles);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);

    useEffect(() => {
        setTimeout(() => {
            // setSearchResult([1, 2, 3, 5]);
        }, 1000);
    });

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
        <div className={cx(cusClassName, 'search-bar')} ref={ref}>
            <Tippy
                interactive
                visible={searchResult.length > 0}
                placement="auto"
                zIndex={4}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                        <ProperWrapper>
                            <SearchVideoItem />
                            <SearchVideoItem />
                            <SearchVideoItem />
                            <SearchVideoItem />
                            <SearchVideoItem />
                        </ProperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Tìm kiếm..."
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChangeValue}
                    />
                    <button type="button" className={cx('clear-btn')} onClick={handleClearSearch}>
                        <ClearIcon className={cx('clear-icon')} />
                    </button>
                    <Button type="submit" btn className={cx('search-btn')}>
                        <SearchIcon />
                    </Button>
                </div>
            </Tippy>
        </div>
    );
};

export default forwardRef(Search);
