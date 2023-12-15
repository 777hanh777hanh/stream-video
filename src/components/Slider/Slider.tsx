import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { useClassNames } from '~/hooks';
import { ChevronIcon } from '~/assets/icons';
import { VideoItem } from '~components/ListVideo';
import { SliderItem } from '~components/Slider';
import style from './Slider.module.scss';

const Slider = ({ className: cusClassName, data }: { className?: any; data?: any }): any => {
    const cx = useMemo(() => useClassNames(style), []);

    const [currentPage, setCurrentPage]: any = useState(1);
    const [remainingItems, setRemainingItems]: any = useState(0);
    const [pages, setPages]: any = useState(1);
    const [itemsPerPage, setItemsPerPage]: any = useState(1);
    const [sliderListWidth, setSliderListWidth]: any = useState(1);
    const [itemWidth, setItemWidth]: any = useState(0);
    const [showBtn, setShowBtn] = useState(false);

    const [windowResizing, setWindowResizing] = useState(false);

    const sliderItemRef = useRef<HTMLInputElement>(null);
    const sliderElementRef = useRef<HTMLInputElement>(null);

    const totalItems = useMemo(() => data.length, [data]);

    useEffect(() => {
        let timeout: any;
        const handleResize = () => {
            clearTimeout(timeout);

            setWindowResizing(true);

            timeout = setTimeout(() => {
                setWindowResizing(false);
            }, 0);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        calculatePages();
    }, []);

    // custom round number
    // 4.1  => 5
    // 4.01 => 4
    const customRound = (number: number) => {
        const decimalPart = number % 1;
        if (decimalPart > 0.1) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    };

    // calculate items / pages and how much pages needed
    const calculatePages = () => {
        setSliderListWidth(sliderElementRef.current?.getBoundingClientRect().width);
        setItemWidth(sliderItemRef.current?.getBoundingClientRect().width);
        const itemsPerPage = customRound(sliderListWidth / itemWidth);
        const pages = customRound(totalItems / itemsPerPage);

        return { itemsPerPage, pages };
    };

    useEffect(() => {
        if (!windowResizing) {
            const { itemsPerPage, pages } = calculatePages();

            if (itemsPerPage !== Infinity && pages !== Infinity) {
                setItemsPerPage(itemsPerPage);
                setPages(pages);

                if (pages > 1) {
                    if (currentPage >= pages) {
                        const itemsPerLastPage = totalItems - (pages - 1) * itemsPerPage;
                        if (itemsPerLastPage !== Infinity) {
                            setCurrentPage(pages);
                            sliderElementRef.current &&
                                (sliderElementRef.current.style.transform = `translateX(calc(${
                                    (pages - 2) * -100
                                }% - ${itemWidth * itemsPerLastPage}px))`);
                            setRemainingItems(0);
                        }
                    } else {
                        sliderElementRef.current &&
                            (sliderElementRef.current.style.transform = `translateX(-${
                                (currentPage - 1) * 100
                            }%)`);
                        setRemainingItems(totalItems - currentPage * itemsPerPage);
                    }
                }
            }
        }
    }, [itemWidth, itemsPerPage]);

    // prev slider
    const handlePrev = () => {
        if (currentPage > 1) {
            sliderElementRef.current &&
                (sliderElementRef.current.style.transform = `translateX(-${(currentPage - 2) * 100}%)`);
            setCurrentPage((prev: any) => prev - 1);
            setRemainingItems(totalItems - itemsPerPage * pages);
        } else {
            const ItemsInLastPage = totalItems - itemsPerPage * (pages - 1);

            sliderElementRef.current &&
                (sliderElementRef.current.style.transform = `translateX(calc(${(pages - 2) * -100}% - ${
                    itemWidth * ItemsInLastPage
                }px))`);
            setCurrentPage(pages);
            setRemainingItems(0);
        }
    };

    // next slider
    const handleNext = () => {
        setShowBtn(true);

        if (currentPage < pages) {
            if (remainingItems >= itemsPerPage) {
                sliderElementRef.current &&
                    (sliderElementRef.current.style.transform = `translateX(-${currentPage * 100}%)`);
                setRemainingItems((prev: any) => prev - itemsPerPage);
            } else {
                const ItemsInLastPage = totalItems - itemsPerPage * (pages - 1);
                sliderElementRef.current &&
                    (sliderElementRef.current.style.transform = `translateX(calc(${
                        (currentPage - 1) * -100
                    }% - ${itemWidth * ItemsInLastPage}px))`);
                setRemainingItems(0);
            }
            setCurrentPage((prev: any) => prev + 1);
        } else {
            sliderElementRef.current && (sliderElementRef.current.style.transform = `translateX(0)`);
            setCurrentPage(1);
            setRemainingItems(totalItems - itemsPerPage);
        }
    };

    // when resize then update pages and itemsPerPage
    useEffect(() => {
        const calcResize = () => {
            calculatePages();
        };
        window.addEventListener('resize', () => calcResize());
        return window.removeEventListener('resize', () => calcResize());
    }, []);

    const renderPagination = Array.from({ length: pages }, (_, i) => {
        return <div key={i} className={cx('page', { active: i === currentPage - 1 })}></div>;
    });

    const renderPaginationMemo = useMemo(() => renderPagination, [currentPage, pages]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider', cusClassName)}>
                <div className={cx('pagination')}>{pages > 1 && renderPaginationMemo}</div>
                {totalItems > itemsPerPage && (
                    <div className={cx('slider-cta')}>
                        {showBtn && (
                            <button className={cx('slider-btn', 'slider-prev')} onClick={handlePrev}>
                                <ChevronIcon />
                            </button>
                        )}
                        <button className={cx('slider-btn', 'slider-next')} onClick={handleNext}>
                            <ChevronIcon className={cx('icon')} />
                        </button>
                    </div>
                )}
                <div className={cx('slider-list-wrapper')}>
                    <div className={cx('slider-list')} ref={sliderElementRef}>
                        {data.map((video: object, index: any) => {
                            return (
                                <SliderItem ref={sliderItemRef} key={index}>
                                    <VideoItem data={video} />
                                </SliderItem>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Slider);
