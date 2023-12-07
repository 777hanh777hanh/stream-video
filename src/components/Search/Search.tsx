import { useRef, useState, forwardRef, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';

import { useClassNames, useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import Button from '~components/Button';
import { ClearIcon, LoadingIcon, SearchIcon } from '~assets/icons';
import ProperWrapper from '~components/Proper/Wrapper';
import SearchVideoItem from './SearchVideoItem';

const Search = ({ className: cusClassName }, ref: any) => {
    const cx = useClassNames(styles);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(true);

    useEffect(() => {
        if (!useDebounce(searchValue, 700).trim()) {
            setSearchResult([]);
            return;
        }
        setIsLoading(true);
        fetch(`https://ihentai.de/api/search?page=1&limit=5&s=${searchValue.replace(/ /g, '+')}`, {})
            .then((res) => res.json())
            .then((data) => {
                setSearchResult(data.videos);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [useDebounce(searchValue, 700)]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearSearch = () => {
        if (isLoading) return;
        setSearchValue('');
        setSearchResult([]);
        inputRef.current?.focus();
    };

    const handleChangeValue = (e: any) => {
        const searchValueInput = e.target.value;
        if (!searchValueInput.startsWith(' ')) setSearchValue(searchValueInput);
    };

    const handleHideSearchResult = () => {
        setShowSearchResult(false);
    };
    return (
        <div className={cx(cusClassName, 'search-bar')} ref={ref}>
            <Tippy
                interactive
                visible={showSearchResult && searchResult.length > 0}
                placement="auto"
                zIndex={4}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                        <ProperWrapper>
                            {searchResult.map((result, index) => (
                                <SearchVideoItem key={index} data={result} />
                            ))}
                        </ProperWrapper>
                    </div>
                )}
                onClickOutside={handleHideSearchResult}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="Tìm kiếm..."
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChangeValue}
                        onFocus={() => setShowSearchResult(true)}
                    />

                    <button type="button" className={cx('clear-btn')} onClick={handleClearSearch}>
                        {!isLoading && <ClearIcon className={cx('clear-icon')} />}
                        {isLoading && <LoadingIcon className={cx('clear-icon', 'loading-icon')} />}
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
