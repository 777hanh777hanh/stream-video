import { useRef, useState, forwardRef, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';

import { useClassNames, useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import Button from '~components/Button';
import { ClearIcon, LoadingIcon, SearchIcon } from '~assets/icons';
import ProperWrapper from '~components/Proper/Wrapper';
import SearchVideoItem from './SearchVideoItem';
import * as searchService from '~/services/searchService';

const Search = ({ className: cusClassName }, ref: any) => {
    const cx = useClassNames(styles);

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSearchResult, setShowSearchResult] = useState(true);

    const debounceSearchValue = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!debounceSearchValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchSearchResult = async () => {
            setIsLoading(true);
            try {
                const response = await searchService.search({ s: debounceSearchValue });

                setSearchResult(response.videos);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchSearchResult();
    }, [debounceSearchValue]);

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
